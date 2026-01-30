import { ItemType } from '../enums/item-type.enum';

export interface Item {
	id: number;
	gameItemId?: number;
	name: string;
	type: ItemType;
	price: number;
	description?: string;
	additionalInfo?: string;
	sources: unknown[];
}
