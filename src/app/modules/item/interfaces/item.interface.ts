export interface Item {
	id: number;
	gameItemId?: Nullable<string>;
	name: string;
	price: number;
	description?: Nullable<string>;
	additionalInfo?: Nullable<string>;
	sources: unknown[];

	recipes: any[];
	asIngredient: any[];
}

export type ItemCreateData = Omit<Item, 'id' | 'recipes' | 'asIngredient'>;

export interface ItemFilter {
	name?: string;
}
