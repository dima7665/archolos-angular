export interface ConsumableStat {
	consumableId: number;
	duration?: Nullable<number>;
	isPercentage: boolean;
	isPermanent: boolean;
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