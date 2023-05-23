import { randEmail, randFullName, randUuid, randPassword, randFullAddress } from '@ngneat/falso';
import { Role, UserEntity } from '../entities/user.entity';
import { ICreateUserPayload } from '../repositories/user.repository';
import { ILoginPayload } from '../controllers/login.controller';
import { TaskEntity } from '../entities/task.entity';

export function generateTaskData(override = {}): TaskEntity {
	return {
		id: randUuid(),
		summary: randFullAddress(),
		owner: generateUserData(),
		createdAt: new Date(),
		updatedAt: new Date(),
		...override,
	};
}

export function generateTasksData(n = 1): TaskEntity[] {
	return Array.from(
		{
			length: n,
		},
		() => {
			return generateTaskData();
		},
	);
}

export function generateUserData(override = {}): UserEntity {
	return {
		id: randUuid(),
		name: randFullName(),
		email: randEmail(),
		password: randPassword(),
		role: Role.TECHNICIAN,
		createdAt: new Date(),
		updatedAt: new Date(),
		...override,
	};
}

export function generateUsersData(n = 1): UserEntity[] {
	return Array.from(
		{
			length: n,
		},
		() => {
			return generateUserData();
		},
	);
}

export function generateUserPayload(): ICreateUserPayload {
	return {
		name: randFullName(),
		email: randEmail(),
		password: randPassword(),
		role: Role.TECHNICIAN,
	};
}

export function generateLoginPayload(): ILoginPayload {
	return {
		email: randEmail(),
		password: randPassword(),
	};
}
