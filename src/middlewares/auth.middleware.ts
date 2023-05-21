import {NextFunction, Request, Response} from 'express';
import {verifyToken} from "../services/auth.service";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.slice(7);

        try {
            req.body.tokenData = verifyToken(token);
            next();
        } catch (error) {
            throw new Error("Unauthenticated");
        }
    } else {
        throw new Error("Unauthenticated");
    }
};
