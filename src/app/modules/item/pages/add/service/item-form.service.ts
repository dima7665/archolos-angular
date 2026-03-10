import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ItemType } from '@app/modules/item/enums/item-type.enum';

// TODO remove?
@Injectable()
export class ItemFormService {
	public readonly stats = {};
	private formGroup!: FormGroup | FormArray;

	public get invalid(): boolean {
		return this.formGroup?.invalid || false;
	}

	public getValue(type: Nullable<ItemType>): object {
		if (!this.formGroup) return {};

		switch (type) {
			case ItemType.Food:
			case ItemType.Potion:
				return { consumableStats: this.formGroup.value };
			default:
				return {};
		}
	}

	public triggerValidation(): void {
		if (!this.formGroup) return;

		this.formGroup.triggerValidation();

		(this.formGroup as FormArray).controls.forEach((stat: any) => {
			const control = stat.controls['consumableId'] as unknown as FormControl;
		});
	}

	public setForm(form: FormGroup | FormArray): void {
		this.formGroup = form;
	}
}
