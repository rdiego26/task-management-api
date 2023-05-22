import * as TaskRepository from "../repositories/task.repository";
import { generateTaskData, generateTasksData } from "../utils/generateData.util";
import TaskController from "./task.controller";
import { TaskEntity } from "../entities/task.entity";

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

});
