import { Injectable } from "@nestjs/common";
import { BrowserInfoRepository } from "./browser-info.repository";
import { BrowserInfo } from "./browser-info.entity";
import { Stat } from "../interfaces/stat.interface";

@Injectable()
export class BrowserInfoService {
    constructor(private readonly browserInfoRepository: BrowserInfoRepository) { }

    async randomEntry(
        browserType: string,
        osType: string,
        browserVersion: string,
    ): Promise<BrowserInfo> {
        const randomEntry: BrowserInfo = await this.browserInfoRepository.randomEntry(browserType, osType, browserVersion);
        return randomEntry;
    }

    async stat(): Promise<Stat> {
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
