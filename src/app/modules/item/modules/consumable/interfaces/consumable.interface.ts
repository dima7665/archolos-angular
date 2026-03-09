import { ConsumableType } from '@app/modules/item/enums/item-type.enum';
import { ConsumableStat } from '@app/modules/item/interfaces/consumable.interface';
import { Item } from '@app/modules/item/interfaces/item.interface';

export interface ConsumableItem extends Item {
	type: ConsumableType;
	consumableStats: ConsumableStat[];
	recipes: any[];
	asIngredient: any[];
}

export type ConsumableCreateData = Omit<ConsumableItem, 'id'>;
