import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../services/auth.service';
import { Role, UserEntity } from '../entities/user.entity';

export const validateManagerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const auth: string | undefined = req.headers.authorization;
	if (auth && auth.startsWith('Bearer')) {
		const token = auth.slice(7);

		try {
			const user: UserEntity = (req.body.tokenData = verifyToken(token));
			if (user.role === Role.MANAGER) {
				next();
			} else {
				res.status(StatusCodes.UNAUTHORIZED).end();
			}
		} catch (error) {
			res.status(StatusCodes.UNAUTHORIZED).end();
		}
	} else {
		res.status(StatusCodes.UNAUTHORIZED).end();
	}
};
