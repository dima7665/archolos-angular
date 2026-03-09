import { ConsumableType } from '@app/modules/item/enums/item-type.enum';
import { ConsumableStatType } from '@app/modules/item/interfaces/consumable.interface';

export interface ConsumableFilter {
	type?: ConsumableType;

	stat?: ConsumableStatType;

	isPermanent?: boolean;
}
