import { getRepository, Repository, UpdateResult } from "typeorm";
import { TaskEntity } from "../entities/task.entity";
import { UserEntity } from "../entities/user.entity";

export interface IAssignTaskPayload {
  userId: string;
}

export interface ICreateTaskPayload {
  summary: string;
  ownerId: string;
}

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

export const assignTask = async (taskId: string, userId: string): Promise<any> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return await repository.update({ id: taskId }, { owner: { id: userId } });
};

export const createTask = async (input: ICreateTaskPayload): Promise<any> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return await repository.save([input]);
};

export const performTask = async (taskId: string): Promise<any> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return await repository.update({ id: taskId }, { performedAt: new Date() });
};

export const deleteTask = async (taskId: string): Promise<UpdateResult> => {
  const repository: Repository<TaskEntity> = getRepository(TaskEntity);
  return await repository.softDelete({
      id: taskId
  });
};
