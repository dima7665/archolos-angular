import { ConsumableStat } from './consumable.interface';

export interface Item {
	id: number;
	gameItemId?: Nullable<string>;
	name: string;
	price: number;
	description?: Nullable<string>;
	additionalInfo?: Nullable<string>;
	sources: unknown[];
}

// TODO remove
export interface ItemIncludes {
	consumableStats: ConsumableStat[];
}

export type ItemCreateData = Omit<Item, 'id'>;

export interface ItemFilter {
	name?: string;
}
