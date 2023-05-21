import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const getUsers = async (): Promise<Array<User>> => {
  const repository = getRepository(User);
  return repository.find();
};
