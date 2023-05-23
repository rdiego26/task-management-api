import { PerformedTaskMessage, Queues } from './messages.consumer';
import { Channel, ConsumeMessage } from 'amqplib';
import Consumer from './consumer';

const queueName: string = Queues.PERFORMED_TASKS;
const callback =
  (channel: Channel) =>
  	async (msg: ConsumeMessage | null): Promise<void> => {
  		if (msg) {
  			try {
  				const content: PerformedTaskMessage = JSON.parse(msg.content.toString());
  				console.log(`The tech ${content.userId} performed the task ${content.taskId} on date ${content.performedAt}`);

  				channel.ack(msg);
  			} catch (e: any) {
  				console.error(e);
  				channel.reject(msg, false);
  			}
  		}
  	};
export async function start(): Promise<any> {
	const consumer = new Consumer(queueName, callback);
	await consumer.start();
}
