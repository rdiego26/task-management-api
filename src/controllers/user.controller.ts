import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { User } from "../entities/User";
import { createUser, getUsers, getUser, ICreateUserPayload } from "../repositories/user.repository";
@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    public async getUsers(): Promise<Array<User>> {
        return getUsers();
    }

    @Get("/:id")
    public async getUser(@Path() id: string): Promise<User | null> {
        return getUser(id);
    }

    @Post("/")
    public async createUser(@Body() body: ICreateUserPayload): Promise<User> {
        return createUser(body);
    }
}

