export interface ConsumableStat {
	id: number;
	consumableId: number;
	duration?: Nullable<number>;
	isPercentage: boolean;
	isPermanent: boolean;
	name: ConsumableStatType;
	value: number;
}

export enum ConsumableStatType {
	Health = 1, // 'health',
	Mana = 2, // 'mana',
	Strength = 3, //'strength',
	Dexterity = 4, // 'dexterity',
	Armor = 5, // 'armor',
	Spellpower = 6, // 'spellpower',
	Experience = 7, // 'exp',
	Speed = 8, // 'speed',
	Underwater = 9, // 'underwater',
}
