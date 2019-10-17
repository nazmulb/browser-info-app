import { Repository, EntityRepository, SelectQueryBuilder } from "typeorm";
import { BrowserInfo } from "./browser-info.entity";

@EntityRepository(BrowserInfo)
export class BrowserInfoRepository extends Repository<BrowserInfo> {
    async randomEntry(
        browserType: string,
        osType: string,
        browserVersion: string,
    ): Promise<BrowserInfo> {
        return this.createQueryBuilder("bf")
                .where("browserType = :browserType", { browserType })
                .andWhere("osType = :osType", { osType })
                .andWhere("browserVersion = :browserVersion", { browserVersion })
                .orderBy("RAND()")
                .take(1)
                .getOne();
    }

    async lastEntityInsertedTime(): Promise<BrowserInfo> {
        return this.createQueryBuilder("bf")
                .select("createdAt")
                .orderBy("id", "DESC")
                .take(1)
                .getRawOne();
    }

    async numberOfEntriesByTypeOSVersion(): Promise<BrowserInfo[]> {
        return this.createQueryBuilder("bf")
                .select("COUNT(1)", "number_of_records")
                .addSelect("browserType")
                .addSelect("osType")
                .addSelect("browserVersion")
                .groupBy("browserType")
                .addGroupBy("osType")
                .addGroupBy("browserVersion")
                .orderBy("number_of_records", "DESC")
                .getRawMany();
    }
}
