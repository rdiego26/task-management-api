import { getRepository, Repository } from "typeorm";
import { Role, UserEntity } from "../entities/user.entity";
import { passwordHash } from "../utils/passwordHash";

export interface ICreateUserPayload {
  name: string;
  password: string;
  email: string;
  role: Role;
}

export const getUsers = async (): Promise<Array<UserEntity>> => {
  const repository: Repository<UserEntity> = getRepository(UserEntity);
  return repository.find();
};

export const createUser = async (payload: ICreateUserPayload): Promise<UserEntity> => {
  const repository: Repository<UserEntity> = getRepository(UserEntity);
  const user: UserEntity = new UserEntity();
  payload.password = passwordHash(payload.password);

  return repository.save({
    ...user,
    ...payload
  });
};

export const getUser = async (id: string): Promise<UserEntity | null> => {
  const repository: Repository<UserEntity> = getRepository(UserEntity);
  const user: UserEntity | null = await repository.findOne({ where: { id } });
  if (!user) {
    return null;
  }
  return user;
};

export const getUserByEmail = async (email: string): Promise<UserEntity | null> => {
  const repository: Repository<UserEntity> = getRepository(UserEntity);
  const user: UserEntity | null = await repository.findOne({ where: { email } });
  if (!user) {
    return null;
  }
  return user;
};
