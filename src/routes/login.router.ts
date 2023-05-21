import express, { Request, Response} from "express";
import LoginController, {ILoginResponse} from "../controllers/login.controller";

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
    try {
        const controller: LoginController = new LoginController();
        const response: ILoginResponse = await controller.login(req.body);

        return res.send(response);
    } catch (err: any) {
        return res.status(400).end();
    }
});

export default router;
