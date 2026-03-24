import { Component, input, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AppSelectComponent } from '@app/modules/shared/form/modules/select/components/select.component';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { RecipeIngredientType } from '../../enums/recipe-ingredient.enum';
import { RecipeIngredientForm } from '../../form/recipe-ingredient.form';
import { SelectOption } from '@app/modules/shared/form/interfaces/select-option.interface';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { SubSink } from 'subsink';
import { RecipeApi } from '../../api/recipe.api';
import { Subject, switchMap, tap } from 'rxjs';

@Component({
	selector: 'recipe-ingredient-form',
	templateUrl: './recipe-ingredient-form.component.html',
	styleUrl: './recipe-ingredient-form.component.scss',
	imports: [ReactiveFormsModule, ValidationModule, AppSelectComponent, AppInputComponent],
})
export class RecipeIngredientFormComponent implements OnInit, OnDestroy {
	public readonly ingredientFormGroup = input.required<RecipeIngredientForm['formGroup'], AbstractControl>({
		transform: (control) => control as unknown as RecipeIngredientForm['formGroup'],
	});
	public readonly index = input.required<number>();

	public readonly ingredientOptions = signal<SelectOption[]>([]);
	public readonly isLoadingIngredients = signal(true);

	public readonly ingredientTypeOptions = [
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
				tap(() => this.isLoadingIngredients.set(true)),
				switchMap(() => this.recipeApi.selectIngredients())
			)
			.subscribe((data) => {
				this.miscOptions = data.misc;
				this.consumableOptions = data.consumables;
				this.weaponOptions = data.weapons;

				this.isLoadingIngredients.set(false);
				this.setOptions(this.ingredientFormGroup().value.ingredientType || RecipeIngredientType.Misc);
			});

		this.loadData$.next();

		this.subs.sink = this.ingredientFormGroup().controls.ingredientType.valueChanges.subscribe((type) =>
			this.setOptions(type)
		);
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	private setOptions(type: RecipeIngredientType): void {
		switch (type) {
			case RecipeIngredientType.Misc:
				this.ingredientOptions.set(this.miscOptions);
				break;
			case RecipeIngredientType.Weapon:
				this.ingredientOptions.set(this.weaponOptions);
				break;
			case RecipeIngredientType.Consumable:
				this.ingredientOptions.set(this.consumableOptions);
				break;
		}
	}
}
