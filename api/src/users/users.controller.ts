import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiOkResponse, ApiUseTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("auth")
    @ApiUseTags("users")
    @ApiOkResponse({type: User})
    async auth(@Body() user: User): Promise<User> {
        return null;
    }
}
