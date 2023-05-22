import express, { Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import LoginController, {ILoginResponse} from "../controllers/login.controller";

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
    try {
        const controller: LoginController = new LoginController();
        const response: ILoginResponse = await controller.login(req.body);

        return res
            .status(StatusCodes.OK)
            .send(response);
    } catch (err: any) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .end();
    }
});

export default router;
