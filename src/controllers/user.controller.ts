import { Get, Route, Tags, Post, Body } from "tsoa";
import { User } from "../entities/User";
import { createUser, getUsers, ICreateUserPayload } from "../repositories/user.repository";
@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    public async getUsers(): Promise<Array<User>> {
        return getUsers();
    }

    @Post("/")
    public async createUser(@Body() body: ICreateUserPayload): Promise<User> {
        return createUser(body);
    }
}

