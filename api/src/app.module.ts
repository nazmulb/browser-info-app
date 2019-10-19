import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersModule } from "./users/users.module";
import { BrowserInfoModule } from "./browser-info/browser-info.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.MYSQL_HOST,
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),
        UsersModule,
        BrowserInfoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes("/pull", "/stat");
    }
}
