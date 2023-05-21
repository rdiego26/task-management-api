import { randEmail, randFullName, randUuid } from '@ngneat/falso';
import { Role, User } from "../../src/entities/User";

export function generateUserData(override = {}): User {
    return {
        id: randUuid(),
        name: randFullName(),
        email: randEmail(),
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
