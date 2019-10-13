import { Controller, Get, Post, Body, Req, Param } from "@nestjs/common";
import { ApiOkResponse, ApiUseTags } from "@nestjs/swagger";
import { BrowserInfoService } from "./browser.info.service";
import { BrowserInfo } from "./browser.info.entity";
import { Request } from "express";

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
		return await this.browserInfoService.list();
	}

	@Post("push")
	@ApiUseTags("browser-info")
	@ApiOkResponse({type: BrowserInfo})
	async push(@Body() browserInfo: BrowserInfo, @Req() request: Request): Promise<BrowserInfo> {
		// console.dir(browserInfo);
		// console.dir(request.headers);
		browserInfo.acceptLanguage = request.headers["accept-language"];
		return await this.browserInfoService.create(browserInfo);
	}
}
