import { Queue } from '../services/queue.service';

export default class Consumer {
	queueName: string;
	queue?: Queue;
	callback: Function;

	constructor(queue: string, callback: Function) {
		this.queueName = queue;
		this.callback = callback;
	}

	async start(): Promise<void> {
		this.queue = new Queue();
		await this.queue.init();

		await this.queue.consumeQueue(this.queueName, this.callback);
	}
}
