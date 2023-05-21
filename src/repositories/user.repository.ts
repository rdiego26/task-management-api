import { getRepository, Repository } from "typeorm";
import { Role, User } from "../entities/User";
import { passwordHash } from "../utils/passwordHash";

export interface ICreateUserPayload {
  name: string;
  password: string;
  email: string;
  role: Role;
}

export const getUsers = async (): Promise<Array<User>> => {
  const repository: Repository<User> = getRepository(User);
  return repository.find();
};

export const createUser = async (payload: ICreateUserPayload): Promise<User> => {
  const repository: Repository<User> = getRepository(User);
  const user: User = new User();
  payload.password = passwordHash(payload.password);

  return repository.save({
    ...user,
    ...payload
  });
};

export const getUser = async (id: string): Promise<User | null> => {
  const repository: Repository<User> = getRepository(User);
  const user: User | null = await repository.findOne({ where: { id } });
  if (!user) {
    return null;
  }
  return user;
};
