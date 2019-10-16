import { Injectable } from "@nestjs/common";
import { BrowserInfoRepository } from "./browser.info.repository";
import { BrowserInfo } from "./browser.info.entity";

export interface IStat {
	insertedTime: string;
	entriesByTypeOSVersion: BrowserInfo[];
}

@Injectable()
export class BrowserInfoService {
	constructor(private readonly browserInfoRepository: BrowserInfoRepository) { }

	async list(): Promise<BrowserInfo[]> {
		const browsers: BrowserInfo[] = await this.browserInfoRepository.find();
		return browsers;
	}

	async stat(): Promise<IStat> {
		const lastInsertedTime: BrowserInfo = await this.browserInfoRepository.lastEntityInsertedTime();
		const entriesByTypeOSVersion: BrowserInfo[] = await this.browserInfoRepository.numberOfEntriesByTypeOSVersion();

		return {
			insertedTime: (lastInsertedTime) ? lastInsertedTime.createdAt : "",
			entriesByTypeOSVersion,
		};
	}

	async create(browserInfo: BrowserInfo): Promise<BrowserInfo> {
		const createdBrowserInfo: BrowserInfo = await this.browserInfoRepository.save(browserInfo);
		return createdBrowserInfo;
	}
}
