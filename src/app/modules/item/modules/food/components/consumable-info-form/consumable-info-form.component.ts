import { Component, computed, input } from '@angular/core';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { consumableStatOptions } from 'app/modules/item/constants/consumable-stat-option';
import { ConsumableStatForm } from 'app/modules/item/form/consumable-stat.form';
import { ConsumableStat } from 'app/modules/item/interfaces/consumable.interface';
import { ItemFormService } from 'app/modules/item/pages/add/service/item-form.service';
import { AppInputComponent } from 'app/modules/shared/form/modules/input/components/input.component';
import { AppSelectComponent } from 'app/modules/shared/form/modules/select/components/select.component';
import { ValidationModule } from 'app/modules/shared/validation/validation.module';

@Component({
	selector: 'consumable-info-form',
	templateUrl: './consumable-info-form.component.html',
	imports: [ReactiveFormsModule, AppInputComponent, AppSelectComponent, ValidationModule],
})
export class ConsumableInfoFormComponent {
	public readonly data = input.required<ConsumableStat[]>();
	public readonly itemId = computed(() => (this.data().length ? this.data()[0].consumableId : null));

	public readonly formGroup = new FormArray<ConsumableStatForm['formGroup']>([]);

	public readonly statTypeOptions = consumableStatOptions;

	constructor(private readonly itemFormService: ItemFormService) {
		itemFormService.setForm(this.formGroup);
	}

	public ngOnInit(): void {
		if (this.itemId()) {
			this.data().forEach((stat) => this.formGroup.push(new ConsumableStatForm(stat).formGroup));
		} else {
			this.formGroup.push(new ConsumableStatForm().formGroup);

			const consumableId = this.formGroup.controls[0].controls.consumableId;

			consumableId.disable();
			consumableId.updateValueAndValidity();
		}
	}

	public addStat(): void {
		const newForm = new ConsumableStatForm().formGroup;
		newForm.controls.consumableId.disable();
		newForm.controls.consumableId.updateValueAndValidity();

		this.formGroup.push(newForm);
	}

	public removeStat(index: number): void {
		this.formGroup.removeAt(index);
	}
}
