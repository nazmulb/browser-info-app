import { Repository, EntityRepository, SelectQueryBuilder } from "typeorm";
import { BrowserInfo } from "./browser.info.entity";

@EntityRepository(BrowserInfo)
export class BrowserInfoRepository extends Repository<BrowserInfo> {
    async lastEntityInsertedTime(): Promise<BrowserInfo[]> {
        return this.find({
            select: ["createdAt"],
            order: {
                id: "DESC",
            },
            take: 1,
        });
    }

    async numberOfEntriesByTypeOSVersion(): Promise<BrowserInfo[]> {
        return this.createQueryBuilder("browser_info")
                .select("COUNT(1)", "number_of_records")
                .addSelect("browserType")
                .addSelect("osType")
                .addSelect("browserVersion")
                .groupBy("browserType")
                .addGroupBy("osType")
                .addGroupBy("browserVersion")
                .orderBy("number_of_records", "DESC")
                .printSql()
                .execute();
    }
}
