import { randEmail, randFullName, randUuid, randPassword } from '@ngneat/falso';
import { Role, UserEntity } from "../entities/user.entity";
import { ICreateUserPayload } from "../repositories/user.repository";
import { ILoginPayload } from "../controllers/login.controller";

export function generateUserData(override = {}): UserEntity {
    return {
        id: randUuid(),
        name: randFullName(),
        email: randEmail(),
        password: randPassword(),
        role: Role.TECHNICIAN,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...override
    }
}

export function generateUsersData(n: number = 1): UserEntity[] {
    return Array.from({
        length: n
    }, (_, i: number) => {
        return generateUserData()
    });
}

export function generateUserPayload(): ICreateUserPayload {
    return {
        name: randFullName(),
        email: randEmail(),
        password: randPassword(),
        role: Role.TECHNICIAN,
    }
}

export function generateLoginPayload(): ILoginPayload {
    return {
        email: randEmail(),
        password: randPassword(),
    }
}
