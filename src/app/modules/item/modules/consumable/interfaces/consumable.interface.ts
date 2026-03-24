import { ConsumableType } from '@app/modules/item/enums/item-type.enum';
import { ConsumableStat } from '@app/modules/item/interfaces/consumable.interface';
import { Item, ItemCreateData } from '@app/modules/item/interfaces/item.interface';

interface _ConsumableData {
	type: ConsumableType;
	consumableStats: ConsumableStat[];
}

export type ConsumableItem = Item & _ConsumableData;

export type ConsumableCreateData = ItemCreateData & _ConsumableData;
