import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../services/auth.service';
import { UserEntity } from '../entities/user.entity';
import { TaskEntity } from '../entities/task.entity';
import { getTask } from '../repositories/task.repository';
import * as console from 'console';

export const validateTechnicianMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const auth: string | undefined = req.headers.authorization;
	const taskId: string = req.params.id;

	if (auth && auth.startsWith('Bearer')) {
		const token: string = auth.slice(7);

		try {
			const user: UserEntity = verifyToken(token);
			const task: TaskEntity = await getTask(taskId);

			if (task.owner.id != user.id) {
				res.status(StatusCodes.UNAUTHORIZED).end();
			} else {
				next();
			}
		} catch (error) {
			console.error(error);
			res.status(StatusCodes.UNAUTHORIZED).end();
		}
	} else {
		res.status(StatusCodes.UNAUTHORIZED).end();
	}
};
