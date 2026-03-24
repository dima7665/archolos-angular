import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeIngredientType } from '../enums/recipe-ingredient.enum';
import { RecipeProductFormData } from '../interfaces/recipe-product.interface';
import { RecipeItem } from '../interfaces/recipe.interface';

export class RecipeProductForm {
	public formGroup = new FormGroup<TypedForm<RecipeProductFormData>>({
		itemType: new FormControl<RecipeIngredientType>(RecipeIngredientType.Misc, {
			nonNullable: true,
			validators: [Validators.required],
		}),

		itemId: new FormControl(this.getItemId(this.data)!, {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	constructor(private readonly data: Partial<RecipeItem> = {}) {}

	private getItemId(data: Partial<RecipeItem>): Nullable<number> {
		return data.consumable?.id || data.weapon?.id || data.misc?.id;
	}
}
