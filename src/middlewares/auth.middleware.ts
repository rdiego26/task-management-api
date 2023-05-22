import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../services/auth.service";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth: string | undefined = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.slice(7);

        try {
            req.body.tokenData = verifyToken(token);
            next();
        } catch (error) {
            res
                .status(StatusCodes.UNAUTHORIZED)
                .end();
        }
    } else {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .end();
    }
};
