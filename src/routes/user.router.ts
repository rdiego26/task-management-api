import express, {NextFunction, Request, Response} from "express";
import UserController from "../controllers/user.controller";
import { User } from "../entities/User";
import {validate, ValidationError} from "class-validator";

const router = express.Router();

router.get("/", async(_req, res) => {
    const controller: UserController = new UserController();
    const response: User[] = await controller.getUsers();

    return res.send(response);
});

router.post("/", async(req: Request, res: Response) => {
    const controller: UserController = new UserController();
    const response: User = await controller.createUser(req.body);

    return res.send(response);
});

export default router;
