import UserController from "./user.controller";
import * as UserRepository from "../repositories/user.repository";
import {generateUsersData, generateUserData, generateUserPayload} from "../../test/utils/generate";
import { User } from "../entities/User";
import {ICreateUserPayload} from "../repositories/user.repository";

afterEach(() => {
   jest.resetAllMocks();
});

describe("UserController", () => {

    describe("getUsers", () => {
       test("should be return empty array", async() => {
           const spy = jest.spyOn(UserRepository, "getUsers").mockResolvedValueOnce([]);
           const controller: UserController = new UserController();
           const users: User[] = await controller.getUsers();

           expect(users).toEqual([]);
           expect(spy).toHaveBeenCalledWith();
           expect(spy).toHaveBeenCalledTimes(1);
       });

       test("should return user list", async() => {
           const usersData: User[] = generateUsersData(2);
           const spy = jest.spyOn(UserRepository, 'getUsers').mockResolvedValueOnce(usersData);
           const controller: UserController = new UserController();
           const users: User[] = await controller.getUsers();

           expect(users).toEqual(usersData);
           expect(spy).toHaveBeenCalledWith();
           expect(spy).toHaveBeenCalledTimes(1);
       });
   });

   describe("createUser", () => {
       test("should add user to the database", async() => {
            const payload: ICreateUserPayload = generateUserPayload();
            const userData: User = generateUserData(payload);
            const spy = jest.spyOn(UserRepository, "createUser").mockResolvedValueOnce(userData);
            const controller: UserController = new UserController();
            const user: User = await controller.createUser(payload);

           expect(user).toMatchObject(payload);
           expect(user).toEqual(userData);
           expect(spy).toHaveBeenCalledWith(payload);
           expect(spy).toHaveBeenCalledTimes(1);
       });

   });
});
