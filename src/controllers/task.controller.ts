import * as express from "express";
import { Get, Route, Request, Tags, Delete, Path, Patch, Post } from "tsoa";
import {
    getMyTasks,
    getTasks,
    deleteTask,
    assignTask,
    ICreateTaskPayload,
    createTask
} from "../repositories/task.repository";
import { TaskEntity } from "../entities/task.entity";
import { verifyToken } from "../services/auth.service";
import { UserEntity } from "../entities/user.entity";
import { UpdateResult } from "typeorm";

@Route("tasks")
@Tags("Task")
export default class TaskController {

    @Delete("/:id")
    public async removeTask(@Path() id: string): Promise<UpdateResult> {
        return deleteTask(id);
    }

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

    @Patch("/:id/assign")
    public async assignTask(@Request() request: express.Request, @Path() id: string): Promise<any> {
        const userId: string = request.body.userId;

        return assignTask(id, userId);
    }

    @Post("/")
    public async createTask(@Request() request: express.Request): Promise<any> {
        const data: ICreateTaskPayload = request.body;

        return createTask(data);
    }
}
