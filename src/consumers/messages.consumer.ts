interface Message {
	type: MessagesType;
}

export enum MessagesType {
	PERFORMED_TASK = 'PERFORMED_TASK',
}

export enum Queues {
	PERFORMED_TASKS = 'PERFORMED_TASKS',
}

export interface PerformedTaskMessage extends Message {
	taskId: string;
	performedAt: Date;
	userId: string;
}
