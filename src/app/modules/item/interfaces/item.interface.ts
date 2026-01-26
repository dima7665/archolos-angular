export interface Item {
	id: number;
	gameItemId?: number;
	name: string;
	type: ItemType;
	price: number;
	description?: string;
	additionalInfo?: string;
	sources: unknown[];
}

export enum ItemType {
	Food = 'food',
	Potion = 'potion',
	Weapon = 'weapon',
	Armor = 'armor',
	Jewelry = 'jewelry',
	Recipe = 'recipe',
	Scroll = 'scroll',
	Other = 'misc',
}
