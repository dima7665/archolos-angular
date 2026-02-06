import { ItemType } from '../enums/item-type.enum';
import { ConsumableStat } from './consumable.interface';

export interface Item {
	id: number;
	gameItemId?: Nullable<string>;
	name: string;
	type: ItemType;
	price: number;
	description?: Nullable<string>;
	additionalInfo?: Nullable<string>;
	sources: unknown[];
}

export interface ItemIncludes {
	consumableStats: ConsumableStat[];
}

export type ItemCreateData = Omit<Item, 'id'>;
