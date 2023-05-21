import express, { Request, Response} from "express";
import UserController from "../controllers/user.controller";
import { UserEntity } from "../entities/user.entity";

const router = express.Router();

router.get("/", async(_req, res) => {
    const controller: UserController = new UserController();
    const response: UserEntity[] = await controller.getUsers();

    return res.send(response);
});

router.get("/:id", async(req, res) => {
    const controller: UserController = new UserController();
    const response: UserEntity | null = await controller.getUser(req.params.id);

    if (!response) {
        return res.status(404).send({ message: "No user found" });
    }
    return res.send(response);
});

router.post("/", async(req: Request, res: Response) => {
    const controller: UserController = new UserController();
    const response: UserEntity = await controller.createUser(req.body);

    return res.send(response);
});

export default router;
