import { Item, ItemCreateData } from '@app/modules/item/interfaces/item.interface';
import { RecipeIngredient, RecipeIngredientCreateData, RecipeIngredientFormData } from './recipe-ingredient.interface';
import { RecipeSkill } from '../enums/recipe.enum';
import { ConsumableItem } from '../../consumable/interfaces/consumable.interface';
import { WeaponItem } from '../../weapon/interfaces/weapon.interface';
import { RecipeCreateDataProduct, RecipeProductFormData } from './recipe-product.interface';

interface _RecipeData {
	requirement: RecipeSkill;
	requirementLevel?: Nullable<number>;

	ingredients: RecipeIngredient[];

	consumable?: Nullable<ConsumableItem>;
	weapon?: Nullable<WeaponItem>;
	misc?: Nullable<Item>;
}

export type RecipeItem = Omit<Item, 'asIngredient' | 'recipes'> & _RecipeData;

export interface RecipeCreateData extends ItemCreateData, RecipeCreateDataProduct {
	requirement: RecipeSkill;
	requirementLevel?: Nullable<number>;

	ingredients: RecipeIngredientCreateData[];
}

export interface RecipeFormData extends ItemCreateData {
	requirement: RecipeSkill;
	requirementLevel?: Nullable<number>;

	ingredients: RecipeIngredientFormData[];

	product: RecipeProductFormData;
}
