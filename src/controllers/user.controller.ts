import { Get, Route, Tags } from "tsoa";
import { User } from "../entities/User";
import { getUsers } from "../repositories/user.repository";

@Route("users")
@Tags("User")
export default class UserController {
    @Get("/")
    public async getUsers(): Promise<Array<User>> {
        return getUsers();
    }
}
