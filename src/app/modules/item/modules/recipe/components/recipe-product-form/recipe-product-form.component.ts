import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AppSelectComponent } from '@app/modules/shared/form/modules/select/components/select.component';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { RecipeIngredientType } from '../../enums/recipe-ingredient.enum';
import { RecipeProductForm } from '../../form/recipe-product.form';
import { SelectOption } from '@app/modules/shared/form/interfaces/select-option.interface';
import { Subject, switchMap, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { RecipeApi } from '../../api/recipe.api';

@Component({
  selector: 'recipe-product-form',
  templateUrl: './recipe-product-form.component.html',
  styleUrl: './recipe-product-form.component.scss',
  imports: [ReactiveFormsModule, ValidationModule, AppSelectComponent],
})
export class RecipeProductFormComponent implements OnInit, OnDestroy {
public readonly productFormGroup = input.required<RecipeProductForm['formGroup'], AbstractControl>({
		transform: (control) => control as unknown as RecipeProductForm['formGroup'],
	});

	public readonly itemOptions = signal<SelectOption[]>([]);
	public readonly isLoadingProducts = signal(true);

	public readonly itemTypeOptions = [
		{ key: RecipeIngredientType.Misc, text: 'Misc' },
		{ key: RecipeIngredientType.Consumable, text: 'Consumable' },
		{ key: RecipeIngredientType.Weapon, text: 'Weapon' },
	];

	private miscOptions: SelectOption[] = [];
	private consumableOptions: SelectOption[] = [];
	private weaponOptions: SelectOption[] = [];

	private readonly loadData$ = new Subject<void>();
	private readonly subs = new SubSink();

	constructor(private readonly recipeApi: RecipeApi) {}

	public ngOnInit(): void {
		// TODO: add store?
		this.subs.sink = this.loadData$
			.pipe(
				tap(() => this.isLoadingProducts.set(true)),
				switchMap(() => this.recipeApi.selectIngredients())
			)
			.subscribe((data) => {
				this.miscOptions = data.misc;
				this.consumableOptions = data.consumables;
				this.weaponOptions = data.weapons;

				this.isLoadingProducts.set(false);
				this.setOptions(this.productFormGroup().value.itemType || RecipeIngredientType.Misc);
			});

		this.loadData$.next();

		this.subs.sink = this.productFormGroup().controls.itemType.valueChanges.subscribe((type) =>
			this.setOptions(type)
		);
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	private setOptions(type: RecipeIngredientType): void {
		switch (type) {
			case RecipeIngredientType.Misc:
				this.itemOptions.set(this.miscOptions);
				break;
			case RecipeIngredientType.Weapon:
				this.itemOptions.set(this.weaponOptions);
				break;
			case RecipeIngredientType.Consumable:
				this.itemOptions.set(this.consumableOptions);
				break;
		}
	}
}
