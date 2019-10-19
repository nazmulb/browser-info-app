import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { ApiOkResponse, ApiUseTags, ApiImplicitBody } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import * as jwt from "jsonwebtoken";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("auth")
    @ApiUseTags("users")
    @ApiImplicitBody({name: "body", type: String})
    @ApiOkResponse({ type: String })
    async auth(@Body("password") password: string): Promise<string> {
        const user: User = await this.usersService.getByPassword(password);
        if (!user) {
            throw new UnauthorizedException("Invalid password");
        }

        const newToken: string = jwt.sign({ password }, process.env.JWT_SECRET_KEY);

        return newToken;
    }

    @Post("create")
    @ApiUseTags("users")
    @ApiOkResponse({ type: User })
    async push(@Body() user: User): Promise<User> {
        return await this.usersService.create(user);
    }
}
