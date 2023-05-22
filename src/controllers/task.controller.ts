import { Get, Route, Tags } from "tsoa";
import { getTasks } from "../repositories/task.repository";
import { TaskEntity } from "../entities/task.entity";

@Route("tasks")
@Tags("Task")
export default class TaskController {
    @Get("/")
    public async getTasks(): Promise<Array<TaskEntity>> {
        return getTasks();
    }

}

