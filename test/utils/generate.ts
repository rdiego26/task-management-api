import { randEmail, randFullName, randUuid, randPassword } from '@ngneat/falso';
import { Role, User } from "../../src/entities/User";
import { ICreateUserPayload } from "../../src/repositories/user.repository";

export function generateUserData(override = {}): User {
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

export function generateUsersData(n: number = 1): User[] {
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
