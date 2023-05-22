import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import TaskController from "../controllers/task.controller";
import { TaskEntity } from "../entities/task.entity";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateManagerMiddleware } from "../middlewares/validateManager.middleware";

const router = express.Router();

router.get("/", [ authMiddleware, validateManagerMiddleware ], async(_req: Request, res: Response) => {
    const controller: TaskController = new TaskController();
    const response: TaskEntity[] = await controller.getTasks();

    return res
        .status(StatusCodes.OK)
        .send(response);
});

export default router;
