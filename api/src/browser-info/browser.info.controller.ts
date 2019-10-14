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
	async stat(@Req() request: Request): Promise<BrowserInfo[]> {
		return await this.browserInfoService.list();
	}

	@Post("push")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async push(@Body() browserInfo: BrowserInfo, @Req() request: Request): Promise<BrowserInfo> {
		// console.dir(request.headers);

		const uAgent = request.header("user-agent");
		if (!browserInfo.hasOwnProperty("userAgent")) {
			browserInfo.userAgent = uAgent;
		}

		const browserObj: BrowserParams = Util.getBrowserWithMajorVersion(uAgent);
		browserInfo.browserType = browserObj.browser;
		if (browserObj.browser !== "Unknown") { browserInfo.browserVersion = browserObj.majorVersion.toString(); }

		browserInfo.osType = Util.getOsType(uAgent);
		browserInfo.acceptLanguage = request.header("accept-language");

		if (!browserInfo.hasOwnProperty("ipAddresses")) {
			browserInfo.ipAddresses = request.header("x-forwarded-for");
		}

		return await this.browserInfoService.create(browserInfo);
	}
}
