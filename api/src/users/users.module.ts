import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
