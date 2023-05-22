import { getRepository, Repository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";

export const getTasks = async (): Promise<Array<TaskEntity>> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return repository.find();
};
