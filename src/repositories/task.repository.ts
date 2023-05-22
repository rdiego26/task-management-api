import { getRepository, Repository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";
import { UserEntity } from "../entities/user.entity";

export const getTasks = async (): Promise<Array<TaskEntity>> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return repository.find();
};

export const getMyTasks = async (owner: UserEntity): Promise<TaskEntity[]> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return await repository.find({
    where: {
      owner: {
        id: owner.id
      }
    }
  });
};
