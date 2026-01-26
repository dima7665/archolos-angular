import { ConsumableStat } from 'app/modules/item/interfaces/consumable.interface';
import { Item, ItemType } from 'app/modules/item/interfaces/item.interface';

export interface FoodItem extends Item {
    type: ItemType.Food;
	consumableStats: ConsumableStat[];
}
