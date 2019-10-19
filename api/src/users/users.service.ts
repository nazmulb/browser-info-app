import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async getByPassword(password: string): Promise<User> {
        const user: User = await this.usersRepository.findOne({ password });
        return user;
    }

    async create(user: User): Promise<User> {
        const createdUser: User = await this.usersRepository.save(user);
        return createdUser;
    }
}
