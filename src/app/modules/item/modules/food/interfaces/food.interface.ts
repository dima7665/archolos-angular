import { ItemType } from 'app/modules/item/enums/item-type.enum';
import { ConsumableStat } from 'app/modules/item/interfaces/consumable.interface';
import { Item } from 'app/modules/item/interfaces/item.interface';

export interface FoodItem extends Item {
    type: ItemType.Food;
	consumableStats: ConsumableStat[];
}
