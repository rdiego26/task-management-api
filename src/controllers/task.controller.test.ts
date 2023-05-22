import * as TaskRepository from "../repositories/task.repository";
import { generateTaskData, generateTasksData, generateUserData } from "../utils/generateData.util";
import { createRequest } from "node-mocks-http";
import TaskController from "./task.controller";
import { TaskEntity } from "../entities/task.entity";
import { UserEntity } from "../entities/user.entity";
import * as AuthService from "../services/auth.service";

afterEach(() => {
   jest.resetAllMocks();
});

describe("TaskController", () => {

    describe("getTasks", () => {
       test("should be return empty array", async() => {
           const spy = jest.spyOn(TaskRepository, "getTasks").mockResolvedValueOnce([]);
           const controller: TaskController = new TaskController();
           const tasks: TaskEntity[] = await controller.getTasks();

           expect(tasks).toEqual([]);
           expect(spy).toHaveBeenCalledWith();
           expect(spy).toHaveBeenCalledTimes(1);
       });

       test("should return task list", async() => {
           const tasksData: TaskEntity[] = generateTasksData(5);
           const spy = jest.spyOn(TaskRepository, "getTasks").mockResolvedValueOnce(tasksData);
           const controller: TaskController = new TaskController();
           const tasks: TaskEntity[] = await controller.getTasks();

           expect(tasks).toEqual(tasksData);
           expect(tasks.length).toBe(5);
           expect(spy).toHaveBeenCalledWith();
           expect(spy).toHaveBeenCalledTimes(1);
       });
   });

   describe("myTasks", () => {
       test("should return empty array to nonexistent or invalid token", async () => {
           const request = createRequest();
           const controller: TaskController = new TaskController();
           const tasks: TaskEntity[] = await controller.getMyTasks(request);

           expect(tasks.length).toBe(0);
       });

       test("should return tasks to valid token", async () => {
           const userData: UserEntity = generateUserData();
           const tasksData: TaskEntity = generateTaskData({ owner: userData });
           const token: string = "validJWT";
           const header: string = `Bearer ${token}`;
           const request = createRequest({
               headers: {
                   authorization: header
               }
           });
           const authServiceSpy = jest.spyOn(AuthService, "verifyToken").mockReturnValueOnce(userData);
           const taskRepositorySpy = jest.spyOn(TaskRepository, "getMyTasks").mockResolvedValueOnce([tasksData]);

           const controller: TaskController = new TaskController();
           const tasks: TaskEntity[] = await controller.getMyTasks(request);

           expect(authServiceSpy).toHaveBeenCalledWith(token);
           expect(taskRepositorySpy).toHaveBeenCalledWith(userData);
           expect(authServiceSpy).toHaveBeenCalledTimes(1);
           expect(taskRepositorySpy).toHaveBeenCalledTimes(1);
           expect(tasks.length).toBe(1);
       });

   });
});
