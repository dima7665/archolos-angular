import { BroadcastEventKey } from '../enums/broadcast-event.enum';

export interface BroadcastMessage<T = any> {
	key: BroadcastEventKey;
	data?: T;
}
