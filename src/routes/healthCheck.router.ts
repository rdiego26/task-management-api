import express from 'express';
import { StatusCodes } from 'http-status-codes';
import HealthCheckController, { HealthCheckResponse } from '../controllers/healthCheck.controller';

const router = express.Router();

router.get('/healthCheck', async (_req, res) => {
	const controller: HealthCheckController = new HealthCheckController();
	const response: HealthCheckResponse = await controller.getData();

	return res.status(StatusCodes.OK).send(response);
});

export default router;
