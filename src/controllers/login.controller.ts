import { Route, Tags, Post, Body } from "tsoa";
import { getUserByEmail } from "../repositories/user.repository";
import { generateAuthToken } from "../services/auth.service";
import { comparePassword } from "../utils/passwordHash";

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

@Route("/login")
@Tags("Login")
export default class LoginController {
    @Post("/")
    public async login(@Body() body: ILoginPayload): Promise<ILoginResponse> {
        const userExists = await getUserByEmail(body.email);

        if(!userExists) {
            throw new Error("Unauthenticated");
        }

        const validPassword: boolean = comparePassword(body.password, userExists.password);
        if(!validPassword) {
            throw new Error("Unauthenticated");
        }

        return { token: generateAuthToken(userExists) };
    }

}

