import { randUuid } from '@ngneat/falso';
import UserController from "./user.controller";
import * as UserRepository from "../repositories/user.repository";
import { generateUsersData, generateUserData, generateUserPayload } from "../utils/generateData.util";
import { UserEntity } from "../entities/user.entity";
import {ICreateUserPayload} from "../repositories/user.repository";

afterEach(() => {
   jest.resetAllMocks();
});

describe("UserController", () => {

    describe("getUsers", () => {
       test("should be return empty array", async() => {
           const spy = jest.spyOn(UserRepository, "getUsers").mockResolvedValueOnce([]);
           const controller: UserController = new UserController();
           const users: UserEntity[] = await controller.getUsers();

           expect(users).toEqual([]);
           expect(spy).toHaveBeenCalledWith();
           expect(spy).toHaveBeenCalledTimes(1);
       });

       test("should return user list", async() => {
           const usersData: UserEntity[] = generateUsersData(2);
           const spy = jest.spyOn(UserRepository, 'getUsers').mockResolvedValueOnce(usersData);
           const controller: UserController = new UserController();
           const users: UserEntity[] = await controller.getUsers();

           expect(users).toEqual(usersData);
           expect(spy).toHaveBeenCalledWith();
           expect(spy).toHaveBeenCalledTimes(1);
       });
   });

   describe("createUser", () => {
       test("should add user to the database", async() => {
            const payload: ICreateUserPayload = generateUserPayload();
            const userData: UserEntity = generateUserData(payload);
            const spy = jest.spyOn(UserRepository, "createUser").mockResolvedValueOnce(userData);
            const controller: UserController = new UserController();
            const user: UserEntity = await controller.createUser(payload);

           expect(user).toMatchObject(payload);
           expect(user).toEqual(userData);
           expect(spy).toHaveBeenCalledWith(payload);
           expect(spy).toHaveBeenCalledTimes(1);
       });
   });

   describe("getUser", () => {
      test("should return user from the database", async() => {
          const userData: UserEntity = generateUserData();
          const spy = jest.spyOn(UserRepository, "getUser").mockResolvedValueOnce(userData);
          const controller: UserController = new UserController();
          const user: UserEntity | null = await controller.getUser(userData.id!!);

          expect(user).toEqual(userData);
          expect(user?.id).toBe(userData.id);
          expect(spy).toHaveBeenCalledWith(userData.id);
          expect(spy).toHaveBeenCalledTimes(1);
      });

       test("should return null if user not found", async () => {
           const id = randUuid();
           const spy = jest.spyOn(UserRepository, 'getUser').mockResolvedValueOnce(null)
           const controller: UserController = new UserController();
           const user: UserEntity | null = await controller.getUser(id);

           expect(user).toBeNull();
           expect(spy).toHaveBeenCalledWith(id);
           expect(spy).toHaveBeenCalledTimes(1);
       })
   });
});
