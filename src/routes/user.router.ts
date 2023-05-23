import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../controllers/user.controller';
import { UserEntity } from '../entities/user.entity';

const router = express.Router();

router.get('/', async (_req, res) => {
	try {
		const controller: UserController = new UserController();
		const response: UserEntity[] = await controller.getUsers();

		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const controller: UserController = new UserController();
		const response: UserEntity | null = await controller.getUser(req.params.id);

		if (!response) {
			return res.status(StatusCodes.NOT_FOUND).send({ message: 'No user found' });
		}
		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.post('/', async (req: Request, res: Response) => {
	try {
		const controller: UserController = new UserController();
		const response: UserEntity = await controller.createUser(req.body);

		return res.status(StatusCodes.CREATED).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

export default router;
