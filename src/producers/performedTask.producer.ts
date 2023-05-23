import { MessagesType, PerformedTaskMessage, Queues } from '../consumers/messages.consumer';
import { Queue } from '../services/queue.service';

const queueName: string = Queues.PERFORMED_TASKS;
const queue: Queue = new Queue();

export async function sendMessage(taskId: string, userId: string): Promise<void> {
	await queue.init();
	const message: PerformedTaskMessage = {
		type: MessagesType.PERFORMED_TASK,
		performedAt: new Date(),
		taskId,
		userId,
	};

	await queue.sendMessage(queueName, JSON.stringify(message));
}
