import client, { Channel, Connection } from 'amqplib';

export class Queue {
	connection?: Connection;
	channel?: Channel;

	public async init(): Promise<void> {
		this.connection = await client.connect(
			`amqp://${process.env.RABBIT_MQ_USER}:${process.env.RABBIT_MQ_PASS}@broker:5672`,
		);

		this.channel = await this.connection.createChannel();
	}

	async sendMessage(queue: string, message: string): Promise<void> {
		await this.channel?.assertQueue(queue);
		this.channel?.sendToQueue(queue, Buffer.from(message));
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	async consumeQueue(queue: string, callback: Function): Promise<void> {
		await this.channel?.assertQueue(queue);
		await this.channel?.consume(queue, callback(this.channel));
	}
}
