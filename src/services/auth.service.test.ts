import * as AuthService from "../services/auth.service";
import { generateUsersData, generateUserData, generateUserPayload } from "../../test/utils/generate";
import { UserEntity } from "../entities/user.entity";
import {generateAuthToken, verifyToken} from "../services/auth.service";

afterEach(() => {
   jest.resetAllMocks();
});

describe("Auth Service", () => {

    describe("generateAuthToken", () => {
       test("should be return the token string", async() => {
           const userData: UserEntity = generateUserData();
           const token: string = generateAuthToken(userData);

           expect(token).not.toBeNull();
       });
   });

    describe("verifyToken", () => {
        test("should be return the user data", async() => {
            const userData: UserEntity = generateUserData();
            const token: string = generateAuthToken(userData);
            const receivedData: UserEntity = verifyToken(token);

            expect(receivedData.id).toEqual(userData.id);
            expect(receivedData.email).toEqual(userData.email);
            expect(receivedData.role).toEqual(userData.role);
        });
    });
});
