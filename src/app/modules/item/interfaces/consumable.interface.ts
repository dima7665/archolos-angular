export interface ConsumableStat {
	consumableId: number;

	duration?: number;

	isPercentage: true;

	isPermanent: false;

	stat: ConsumableStatType;

	value: number;
}

export enum ConsumableStatType {
	Health = 'health',
	Mana = 'mana',
	Strength = 'strength',
	Dexterity = 'dexterity',
	Spellpower = 'spellpower',
	Experience = 'exp',
	Armor = 'armor',
	Speed = 'speed',
	Underwater = 'underwater',
}