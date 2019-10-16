import { Controller, Get, Post, Body, Req, Query } from "@nestjs/common";
import { IsString, IsNotEmpty } from "class-validator";
import { ApiOkResponse, ApiUseTags, ApiImplicitQuery } from "@nestjs/swagger";
import { BrowserInfoService, IStat } from "./browser.info.service";
import { BrowserInfo } from "./browser.info.entity";
import { Request } from "express";
import { Util, IBrowser } from "../Util";

export class PullQueries {
	@IsString()
	@IsNotEmpty()
	browserType: string;

	@IsString()
	@IsNotEmpty()
	osType: string;

	@IsString()
	@IsNotEmpty()
	browserVersion: string;
}

@Controller()
export class BrowserInfoController {
	constructor(private readonly browserInfoService: BrowserInfoService) {}

	@Get("pull")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async pull(@Query() queries: PullQueries): Promise<BrowserInfo> {
		return await this.browserInfoService.randomEntry(queries.browserType, queries.osType, queries.browserVersion);
	}

	@Get("stat")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async stat(): Promise<IStat> {
		return await this.browserInfoService.stat();
	}

	@Post("push")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async push(@Body() browserInfo: BrowserInfo, @Req() request: Request): Promise<BrowserInfo> {
		const uAgent = request.header("user-agent");
		if (!browserInfo.hasOwnProperty("userAgent")) {
			browserInfo.userAgent = uAgent;
		}

		const browserObj: IBrowser = Util.getBrowserWithMajorVersion(uAgent);
		browserInfo.browserType = browserObj.browserType;
		if (browserObj.browserType !== "Unknown") { browserInfo.browserVersion = browserObj.majorVersion.toString(); }

		browserInfo.osType = Util.getOsType(uAgent);
		browserInfo.acceptLanguage = request.header("accept-language");

		const ip = request.connection.remoteAddress.split(":");
		const pip = ip[ip.length - 1];
		const publicIP = request.header("x-forwarded-for") || pip;

		if (browserInfo.hasOwnProperty("ipAddresses") && browserInfo.ipAddresses) {
			browserInfo.ipAddresses += "," + publicIP;
		} else {
			browserInfo.ipAddresses = publicIP;
		}

		return await this.browserInfoService.create(browserInfo);
	}
}
