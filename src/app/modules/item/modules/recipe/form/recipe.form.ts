import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';
import { RecipeFormData, RecipeItem } from '../interfaces/recipe.interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ItemForm } from '@app/modules/item/form/item.form';
import { RecipeSkill } from '../enums/recipe.enum';
import { RecipeIngredientForm } from './recipe-ingredient.form';
import { RecipeProductForm } from './recipe-product.form';

export class RecipeForm {
	private baseFormGroup = new ItemForm(this.data).formGroup;

	public formGroup = new FormGroup<TypedForm<RecipeFormData>>({
		...this.baseFormGroup.controls,

		requirement: new FormControl(RecipeSkill.Alchemy, { nonNullable: true }),
		requirementLevel: new FormControl(null),

		ingredients: new FormArray<RecipeIngredientForm['formGroup']>([]) as unknown as FormControl,

		product: new RecipeProductForm().formGroup as unknown as FormControl,
	});

	constructor(private readonly data: Partial<RecipeItem> = {}) {}
}
