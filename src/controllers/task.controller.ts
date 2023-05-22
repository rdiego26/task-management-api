import * as express from "express";
import { Get, Route, Request, Tags } from "tsoa";
import { getMyTasks, getTasks } from "../repositories/task.repository";
import { TaskEntity } from "../entities/task.entity";
import { verifyToken } from "../services/auth.service";
import { UserEntity } from "../entities/user.entity";

@Route("tasks")
@Tags("Task")
export default class TaskController {
    @Get("/")
    public async getTasks(): Promise<Array<TaskEntity>> {
        return getTasks();
    }

    @Get("myTasks")
    public async getMyTasks(@Request() request: express.Request): Promise<Array<TaskEntity>> {
        const auth: string | undefined = request.headers.authorization;
        if (auth && auth.startsWith('Bearer')) {
            const token: string = auth.slice(7);
            const user: UserEntity = verifyToken(token);

            return getMyTasks(user);
        } else {
            return [];
        }
    }
}
