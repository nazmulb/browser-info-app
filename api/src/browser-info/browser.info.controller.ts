import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiOkResponse, ApiUseTags } from "@nestjs/swagger";
import { BrowserInfoService } from "./browser.info.service";
import { BrowserInfo } from "./browser.info.entity";

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
	async push(@Body() browserInfo: BrowserInfo): Promise<BrowserInfo> {
		return await this.browserInfoService.create(browserInfo);
	}
}
