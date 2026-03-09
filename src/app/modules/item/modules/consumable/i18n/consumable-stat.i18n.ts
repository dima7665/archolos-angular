import { ConsumableStatType } from '@app/modules/item/interfaces/consumable.interface';

export const consumableStatI18n: Record<ConsumableStatType, string> = {
	[ConsumableStatType.Health]: 'Health',
	[ConsumableStatType.Mana]: 'Mana',
	[ConsumableStatType.Strength]: 'Strength',
	[ConsumableStatType.Dexterity]: 'Dexterity',
	[ConsumableStatType.Armor]: 'Armor',
	[ConsumableStatType.Spellpower]: 'Spellpower',
	[ConsumableStatType.Experience]: 'Experience',
	[ConsumableStatType.Speed]: 'Speed',
	[ConsumableStatType.Underwater]: 'Underwater',
};
