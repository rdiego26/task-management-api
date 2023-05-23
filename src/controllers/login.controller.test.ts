import UserController from './user.controller';
import * as PasswordUtils from '../utils/passwordHash.util';
import * as UserRepository from '../repositories/user.repository';
import { generateLoginPayload, generateUserData, generateUserPayload } from '../utils/generateData.util';
import { UserEntity } from '../entities/user.entity';
import LoginController, { ILoginPayload } from './login.controller';

afterEach(() => {
	jest.resetAllMocks();
});

describe('LoginController', () => {
	describe('login', () => {
		test('should throws for nonexistent email', async () => {
			const payload: ILoginPayload = generateLoginPayload();
			const spy = jest.spyOn(UserRepository, 'getUserByEmail').mockResolvedValueOnce(null);
			const controller: LoginController = new LoginController();
			await expect(async () => {
				await controller.login(payload);
			}).rejects.toThrowError('Unauthenticated');

			expect(spy).toHaveBeenCalledWith(payload.email);
			expect(spy).toHaveBeenCalledTimes(1);
		});

		test('should throws for incorrect password', async () => {
			const payload: ILoginPayload = generateLoginPayload();
			const userData: UserEntity = generateUserData(payload);
			const userRepositorySpy = jest.spyOn(UserRepository, 'getUserByEmail').mockResolvedValueOnce(userData);
			const passwordUtilsSpy = jest.spyOn(PasswordUtils, 'comparePassword').mockReturnValueOnce(false);
			const controller: LoginController = new LoginController();
			await expect(async () => {
				await controller.login(payload);
			}).rejects.toThrowError('Unauthenticated');

			expect(userRepositorySpy).toHaveBeenCalledWith(payload.email);
			expect(userRepositorySpy).toHaveBeenCalledTimes(1);
			expect(passwordUtilsSpy).toHaveBeenCalledWith(payload.password, userData.password);
			expect(passwordUtilsSpy).toHaveBeenCalledTimes(1);
		});

		test('should return valid JWT', async () => {
			const payload: ILoginPayload = generateLoginPayload();
			const userData: UserEntity = generateUserData(payload);
			const userRepositorySpy = jest.spyOn(UserRepository, 'getUserByEmail').mockResolvedValueOnce(userData);
			const passwordUtilsSpy = jest.spyOn(PasswordUtils, 'comparePassword').mockReturnValueOnce(true);
			const controller: LoginController = new LoginController();
			const response = await controller.login(payload);

			expect(userRepositorySpy).toHaveBeenCalledWith(payload.email);
			expect(userRepositorySpy).toHaveBeenCalledTimes(1);
			expect(passwordUtilsSpy).toHaveBeenCalledWith(payload.password, userData.password);
			expect(passwordUtilsSpy).toHaveBeenCalledTimes(1);
			expect(response.token).not.toBeNull();
		});
	});
});
