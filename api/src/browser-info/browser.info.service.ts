import { Injectable } from "@nestjs/common";
import { BrowserInfoRepository } from "./browser.info.repository";
import { BrowserInfo } from "./browser.info.entity";

@Injectable()
export class BrowserInfoService {
	constructor(private readonly browserInfoRepository: BrowserInfoRepository) { }

	async list(): Promise<BrowserInfo[]> {
		const browsers: BrowserInfo[] = await this.browserInfoRepository.find();
		return browsers;
	}

	async stat(): Promise<BrowserInfo[]> {
		const browsers: BrowserInfo[] = await this.browserInfoRepository.find();
		return browsers;
	}

	async create(browserInfo: BrowserInfo): Promise<BrowserInfo> {
		const createdBrowserInfo: BrowserInfo = await this.browserInfoRepository.save(browserInfo);
		return createdBrowserInfo;
	}
}
