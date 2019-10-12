import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";

@Module({
	imports: [
			TypeOrmModule.forFeature([User]),
			TypeOrmModule.forFeature([UsersRepository]),
		],
	providers: [
		UsersService,
	],
	controllers: [UsersController],
})
export class UsersModule {}
