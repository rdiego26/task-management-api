import { getRepository, Repository } from "typeorm";
import { Role, User } from "../entities/User";

export interface ICreateUserPayload {
  name: string;
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

  return repository.save({
    ...user,
    ...payload
  });
};
