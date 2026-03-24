import { Component, input, OnInit } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { RecipeIngredientFormComponent } from '../recipe-ingredient-form/recipe-ingredient-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeApi } from '../../api/recipe.api';
import { RecipeCreateData, RecipeFormData, RecipeItem } from '../../interfaces/recipe.interface';
import { ItemType } from '@app/modules/item/enums/item-type.enum';
import { RecipeForm } from '../../form/recipe.form';
import { RecipeIngredientForm } from '../../form/recipe-ingredient.form';
import { RecipeIngredientCreateData, RecipeIngredientFormData } from '../../interfaces/recipe-ingredient.interface';
import { RecipeIngredientType } from '../../enums/recipe-ingredient.enum';
import { RecipeCreateDataProduct, RecipeProductFormData } from '../../interfaces/recipe-product.interface';
import { RecipeProductForm } from '../../form/recipe-product.form';
import { RecipeProductFormComponent } from '../recipe-product-form/recipe-product-form.component';

@Component({
	selector: 'recipe-form',
	templateUrl: './recipe-form.component.html',
	styleUrl: './recipe-form.component.scss',
	imports: [
		ReactiveFormsModule,
		ValidationModule,
		AppInputComponent,
		RecipeIngredientFormComponent,
		RecipeProductFormComponent,
	],
})
export class RecipeFormComponent implements OnInit {
	public readonly item = input<Nullable<RecipeItem>>(null);

	public readonly formGroup = new RecipeForm().formGroup;
	public readonly ingredientsForm = this.formGroup.controls.ingredients as unknown as FormArray;
	public readonly productForm = this.formGroup.controls.product as unknown as RecipeProductForm['formGroup'];

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly recipeApi: RecipeApi
	) {}

	public ngOnInit(): void {
		if (this.item()) {
			this.item()?.ingredients.forEach((ing) =>
				this.ingredientsForm.push(new RecipeIngredientForm(ing).formGroup)
			);
		} else {
			this.ingredientsForm.push(new RecipeIngredientForm().formGroup);
		}
	}

	public async onSubmit(): Promise<void> {
		// TODO: amount input (for price - only numbers allowed)
		// TODO: also add backend error validation higlights

		// TODO: custom validation - product should not be same as ingredient

		if (this.formGroup.invalid) {
			this.formGroup.triggerValidation();
			return;
		}

		// TODO: fix sources - should not be present if empty ([] - became {} in database, should be null)

		const res = await this.recipeApi.add(this.toPayloadData(this.formGroup.value as RecipeFormData));

		this.router.navigate(['items', ItemType.Recipe]);
	}

	public onCancel(): void {
		this.router.navigate(['items', ItemType.Recipe]);
	}

	public addIngredient(): void {
		const newForm = new RecipeIngredientForm().formGroup;

		this.ingredientsForm.push(newForm);
	}

	public removeIngredient(index: number): void {
		this.ingredientsForm.removeAt(index);
	}

	private toPayloadData({ ingredients, product, ...rawData }: RecipeFormData): RecipeCreateData {
		return {
			ingredients: ingredients.map((i) => this.toPayloadIngredient(i)),
			...rawData,
			...this.toPayloadProduct(product),
		};
	}

	private toPayloadIngredient(data: RecipeIngredientFormData): RecipeIngredientCreateData {
		switch (data.ingredientType) {
			case RecipeIngredientType.Misc:
				return { quantity: data.quantity, miscId: data.itemId };
			case RecipeIngredientType.Consumable:
				return { quantity: data.quantity, consumableId: data.itemId };
			case RecipeIngredientType.Weapon:
				return { quantity: data.quantity, weaponId: data.itemId };
		}
	}

	private toPayloadProduct(data: RecipeProductFormData): RecipeCreateDataProduct {
		switch (data.itemType) {
			case RecipeIngredientType.Misc:
				return { miscId: data.itemId };
			case RecipeIngredientType.Consumable:
				return { consumableId: data.itemId };
			case RecipeIngredientType.Weapon:
				return { weaponId: data.itemId };
		}
	}
}
