import { SelectOption, SelectOptionBackend } from '@app/modules/shared/form/interfaces/select-option.interface';
import { RecipeIngredientType } from '../enums/recipe-ingredient.enum';

export interface RecipeIngredient {
	id: number;
	name: string;
	quantity: number;

	recipeId?: number;

	consumableId?: Nullable<number>;
	weaponId?: Nullable<number>;
	miscId?: Nullable<number>;
}

export interface RecipeIngredientCreateData {
	quantity: number;

	consumableId?: Nullable<number>;
	weaponId?: Nullable<number>;
	miscId?: Nullable<number>;
}

export interface RecipeIngredientFormData {
	quantity: number;
	ingredientType: RecipeIngredientType;
	itemId: number;
}

export interface RecipeIngredientsSelectListRaw {
	misc: SelectOptionBackend[];
	weapons: SelectOptionBackend[];
	consumables: SelectOptionBackend[];
}

export interface RecipeIngredientsSelectList {
	misc: SelectOption[];
	weapons: SelectOption[];
	consumables: SelectOption[];
}
