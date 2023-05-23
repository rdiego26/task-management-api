import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TaskController from '../controllers/task.controller';
import { TaskEntity } from '../entities/task.entity';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateManagerMiddleware } from '../middlewares/validateManager.middleware';
import { UpdateResult } from 'typeorm';
import { validateTechnicianMiddleware } from '../middlewares/validateTechnician.middleware';

const router = express.Router();

router.delete('/:id', [authMiddleware, validateManagerMiddleware], async (req: Request, res: Response) => {
	try {
		const controller: TaskController = new TaskController();
		const response: UpdateResult = await controller.removeTask(req.params.id);

		if (response.affected && response.affected > 0) {
			return res.status(StatusCodes.OK).send(response);
		} else {
			return res.status(StatusCodes.NOT_MODIFIED).send(response);
		}
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.get('/', [authMiddleware, validateManagerMiddleware], async (req: Request, res: Response) => {
	try {
		const controller: TaskController = new TaskController();
		const response: TaskEntity[] = await controller.getTasks();

		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.get('/myTasks', [authMiddleware], async (req: Request, res: Response) => {
	try {
		const controller: TaskController = new TaskController();
		const response: TaskEntity[] | undefined = await controller.getMyTasks(req);

		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.patch('/:id/assign', [authMiddleware, validateManagerMiddleware], async (req: Request, res: Response) => {
	try {
		const controller: TaskController = new TaskController();
		const response: any = await controller.assignTask(req, req.params.id);

		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.patch('/:id/perform', [authMiddleware, validateTechnicianMiddleware], async (req: Request, res: Response) => {
	try {
		const controller: TaskController = new TaskController();
		const response: any = await controller.performTask(req, req.params.id);

		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

router.post('/', [authMiddleware, validateManagerMiddleware], async (req: Request, res: Response) => {
	try {
		const controller: TaskController = new TaskController();
		const response: any = await controller.createTask(req);

		return res.status(StatusCodes.OK).send(response);
	} catch (e: any) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Unable to perform the operation' });
	}
});

export default router;
