import { BrowserInfo } from "../browser-info/browser-info.entity";

export interface Stat {
    insertedTime: string;
    entriesByTypeOSVersion: BrowserInfo[];
}
