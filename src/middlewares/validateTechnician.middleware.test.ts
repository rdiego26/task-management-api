import { StatusCodes } from 'http-status-codes';
import { createRequest, createResponse } from 'node-mocks-http';
import { validateTechnicianMiddleware } from './validateTechnician.middleware';
import * as TaskRepository from '../repositories/task.repository';
import * as AuthService from '../services/auth.service';
import { generateTaskData, generateUserData } from '../utils/generateData.util';
import { Role, UserEntity } from '../entities/user.entity';
import { TaskEntity } from '../entities/task.entity';

afterEach(() => {
	jest.resetAllMocks();
});

describe('Validate Technician Middleware', () => {
	describe('validateTechnicianMiddleware', () => {
		test('should be get UNAUTHORIZED for nonexistent token', async () => {
			const response = createResponse();
			const request = createRequest();
			const nextFn = jest.fn();
			await validateTechnicianMiddleware(request, response, nextFn);

			expect(response._getStatusCode()).toEqual(StatusCodes.UNAUTHORIZED);
			expect(nextFn).toHaveBeenCalledTimes(0);
		});

		test('should be get UNAUTHORIZED for invalid token', async () => {
			const request = createRequest({
				headers: {
					authorization: '',
				},
			});
			const response = createResponse();
			const nextFn = jest.fn();
			await validateTechnicianMiddleware(request, response, nextFn);

			expect(response._getStatusCode()).toEqual(StatusCodes.UNAUTHORIZED);
			expect(nextFn).toHaveBeenCalledTimes(0);
		});

		test('should not call nextFunction for valid technician token but not owner', async () => {
			const technicianUserData: UserEntity = generateUserData();
			const taskData: TaskEntity = generateTaskData();
			const token = 'validJWT';
			const header = `Bearer ${token}`;

			const authServiceSpy = jest.spyOn(AuthService, 'verifyToken').mockReturnValueOnce(technicianUserData);
			const taskRepositorySpy = jest.spyOn(TaskRepository, 'getTask').mockResolvedValueOnce(taskData);
			const request = createRequest({
				headers: {
					authorization: header,
				},
			});
			const response = createResponse();
			const nextFn = jest.fn();
			await validateTechnicianMiddleware(request, response, nextFn);

			expect(authServiceSpy).toHaveBeenCalledWith(token);
			expect(taskRepositorySpy).toHaveBeenCalledTimes(1);
			expect(nextFn).toHaveBeenCalledTimes(0);
		});

		test('should be get call nextFunction for valid technician owner token', async () => {
			const userData: UserEntity = generateUserData();
			const taskData: TaskEntity = generateTaskData({ owner: userData });
			const token = 'validJWT';
			const header = `Bearer ${token}`;

			const authServiceSpy = jest.spyOn(AuthService, 'verifyToken').mockReturnValueOnce(userData);
			const taskRepositorySpy = jest.spyOn(TaskRepository, 'getTask').mockResolvedValueOnce(taskData);
			const request = createRequest({
				headers: {
					authorization: header,
				},
			});
			const response = createResponse();
			const nextFn = jest.fn();
			await validateTechnicianMiddleware(request, response, nextFn);

			expect(authServiceSpy).toHaveBeenCalledWith(token);
			expect(taskRepositorySpy).toHaveBeenCalledTimes(1);
			expect(nextFn).toHaveBeenCalledTimes(1);
		});
	});
});
