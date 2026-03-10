import { Component, computed, inject, input } from '@angular/core';
import { FormArray, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { consumableStatOptions } from '@app/modules/item/constants/consumable-stat-option';
import { ConsumableStatForm } from '@app/modules/item/modules/consumable/modules/consumable-form/forms/consumable-stat.form';
import { ConsumableStat } from '@app/modules/item/interfaces/consumable.interface';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { AppSelectComponent } from '@app/modules/shared/form/modules/select/components/select.component';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { ConsumableForm } from '../../forms/consumable.form';
import { SwitchComponent } from '@app/modules/shared/form/modules/switch/components/switch/switch.component';

@Component({
	selector: 'consumable-info-form',
	templateUrl: './consumable-info-form.component.html',
	styleUrl: './consumable-info-form.component.scss',
	imports: [ReactiveFormsModule, AppInputComponent, AppSelectComponent, SwitchComponent, ValidationModule],
})
export class ConsumableInfoFormComponent {
	public readonly data = input.required<ConsumableStat[]>();
	public readonly itemId = computed(() => (this.data().length ? this.data()[0].consumableId : null));

	public formGroup!: FormArray<ConsumableStatForm['formGroup']>;

	public readonly statTypeOptions = consumableStatOptions;

	private readonly _parentFormGroupDirective = inject(FormGroupDirective);

	// TODO: disable duration field if isPermanent=true

	public ngOnInit(): void {
		this.formGroup = (this._parentFormGroupDirective.form as ConsumableForm['formGroup']).controls
			.consumableStats as unknown as FormArray<ConsumableStatForm['formGroup']>;

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
