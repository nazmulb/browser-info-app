import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrowserInfoController } from "./browser.info.controller";
import { BrowserInfoService } from "./browser.info.service";
import { BrowserInfoRepository } from "./browser.info.repository";

@Module({
	imports: [TypeOrmModule.forFeature([BrowserInfoRepository])],
	providers: [BrowserInfoService],
	controllers: [BrowserInfoController],
})
export class BrowserInfoModule {}
