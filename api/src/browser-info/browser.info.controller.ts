import { Controller, Get, Post, Body, Req, Param } from "@nestjs/common";
import { ApiOkResponse, ApiUseTags } from "@nestjs/swagger";
import { BrowserInfoService } from "./browser.info.service";
import { BrowserInfo } from "./browser.info.entity";
import { Request } from "express";
import { Util, BrowserParams } from "../Util";

@Controller()
export class BrowserInfoController {
	constructor(private readonly browserInfoService: BrowserInfoService) {}

	@Get("pull")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async pull(): Promise<BrowserInfo[]> {
		return await this.browserInfoService.list();
	}

	@Get("stat")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async stat(): Promise<BrowserInfo[]> {
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

		const browserObj: BrowserParams = Util.getBrowserWithMajorVersion(uAgent);
		browserInfo.browserType = browserObj.browser;
		if (browserObj.browser !== "Unknown") { browserInfo.browserVersion = browserObj.majorVersion.toString(); }

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
