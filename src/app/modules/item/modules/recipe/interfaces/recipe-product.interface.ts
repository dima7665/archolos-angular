import { RecipeIngredientType } from '../enums/recipe-ingredient.enum';

export interface RecipeProductFormData {
	itemType: RecipeIngredientType;
	itemId: number;
}

export interface RecipeCreateDataProduct {
	miscId?: Nullable<number>;
	consumableId?: Nullable<number>;
	weaponId?: Nullable<number>;
}
