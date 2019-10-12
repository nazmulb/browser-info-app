import { Repository, EntityRepository } from "typeorm";
import { BrowserInfo } from "./browser.info.entity";

@EntityRepository(BrowserInfo)
export class BrowserInfoRepository extends Repository<BrowserInfo> {}
