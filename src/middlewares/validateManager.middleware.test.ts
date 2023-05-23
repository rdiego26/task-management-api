import { StatusCodes } from 'http-status-codes';
import { createRequest, createResponse } from 'node-mocks-http';
import { validateManagerMiddleware } from './validateManager.middleware';
import * as AuthService from '../services/auth.service';
import { generateUserData } from '../utils/generateData.util';
import { Role, UserEntity } from '../entities/user.entity';

afterEach(() => {
	jest.resetAllMocks();
});

describe('Validate Manager Middleware', () => {
	describe('validateManagerMiddleware', () => {
		test('should be get UNAUTHORIZED for nonexistent token', async () => {
			const response = createResponse();
			const request = createRequest();
			const nextFn = jest.fn();
			validateManagerMiddleware(request, response, nextFn);

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
			validateManagerMiddleware(request, response, nextFn);

			expect(response._getStatusCode()).toEqual(StatusCodes.UNAUTHORIZED);
			expect(nextFn).toHaveBeenCalledTimes(0);
		});

		test('should not call nextFunction for valid technician token', async () => {
			const technicianUserData: UserEntity = generateUserData();
			const token = 'validJWT';
			const header = `Bearer ${token}`;

			const authServiceSpy = jest.spyOn(AuthService, 'verifyToken').mockReturnValueOnce(technicianUserData);
			const request = createRequest({
				headers: {
					authorization: header,
				},
			});
			const response = createResponse();
			const nextFn = jest.fn();
			validateManagerMiddleware(request, response, nextFn);

			expect(authServiceSpy).toHaveBeenCalledWith(token);
			expect(nextFn).toHaveBeenCalledTimes(0);
		});

		test('should be get call nextFunction for valid manager token', async () => {
			const userData: UserEntity = generateUserData({ role: Role.MANAGER });
			const token = 'validJWT';
			const header = `Bearer ${token}`;

			const spy = jest.spyOn(AuthService, 'verifyToken').mockReturnValueOnce(userData);
			const request = createRequest({
				headers: {
					authorization: header,
				},
			});
			const response = createResponse();
			const nextFn = jest.fn();
			validateManagerMiddleware(request, response, nextFn);

			expect(spy).toHaveBeenCalledWith(token);
			expect(nextFn).toHaveBeenCalledTimes(1);
		});
	});
});
