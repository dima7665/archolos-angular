import { ConsumableStat } from 'app/modules/item/interfaces/consumable.interface';
import { Item, ItemType } from 'app/modules/item/interfaces/item.interface';

export interface PotionItem extends Item {
    type: ItemType.Potion;
    consumableStats: ConsumableStat[];
}