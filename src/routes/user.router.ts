import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserController from '../controllers/user.controller';
import { UserEntity } from '../entities/user.entity';

const router = express.Router();

router.get('/', async (_req, res) => {
	const controller: UserController = new UserController();
	const response: UserEntity[] = await controller.getUsers();

	return res.status(StatusCodes.OK).send(response);
});

router.get('/:id', async (req, res) => {
	const controller: UserController = new UserController();
	const response: UserEntity | null = await controller.getUser(req.params.id);

	if (!response) {
		return res.status(StatusCodes.NOT_FOUND).send({ message: 'No user found' });
	}
	return res.status(StatusCodes.OK).send(response);
});

router.post('/', async (req: Request, res: Response) => {
	const controller: UserController = new UserController();
	const response: UserEntity = await controller.createUser(req.body);

	return res.status(StatusCodes.CREATED).send(response);
});

export default router;
