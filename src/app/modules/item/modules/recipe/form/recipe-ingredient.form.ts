import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';
import { RecipeIngredient, RecipeIngredientFormData } from '../interfaces/recipe-ingredient.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeIngredientType } from '../enums/recipe-ingredient.enum';

export class RecipeIngredientForm {
	public formGroup = new FormGroup<TypedForm<RecipeIngredientFormData>>({
		quantity: new FormControl(this.data.quantity || 1, {
			nonNullable: true,
			validators: [Validators.required, Validators.min(1)],
		}),

		ingredientType: new FormControl<RecipeIngredientType>(RecipeIngredientType.Misc, {
			nonNullable: true,
			validators: [Validators.required],
		}),

		itemId: new FormControl(this.getItemId(this.data)!, {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	constructor(private readonly data: Partial<RecipeIngredient> = {}) {}

	private getItemId(data: Partial<RecipeIngredient>): Nullable<number> {
		return data.consumableId || data.weaponId || data.miscId;
	}
}
