import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
