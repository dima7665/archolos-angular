import { Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { ConsumableInfoFormComponent } from '../consumable-info-form/consumable-info-form.component';
import { ConsumableForm } from '../../forms/consumable.form';
import { ConsumableCreateData, ConsumableItem } from '../../../../interfaces/consumable.interface';
import { ConsumableApi } from '../../../../api/consumable.api';
import { ConsumableType, ItemType } from '@app/modules/item/enums/item-type.enum';

@Component({
	selector: 'consumable-form',
	templateUrl: './consumable-form.component.html',
	styleUrl: './consumable-form.component.scss',
	imports: [ReactiveFormsModule, AppInputComponent, ValidationModule, ConsumableInfoFormComponent],
})
export class ConsumableFormComponent {
	public readonly item = input<Nullable<ConsumableItem>>(null);

	public readonly stats = computed(() => this.item()?.consumableStats || []);

	public readonly formGroup = new ConsumableForm().formGroup;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly consumableApi: ConsumableApi
	) {}

	public async onSubmit(): Promise<void> {
		// TODO: amount input (for price - only numbers allowed)
		// TODO: also add backend error validation higlights
console.log(this.formGroup.value);
		if (this.formGroup.invalid) {
			this.formGroup.triggerValidation();
			return;
		}

		// TODO: fix sources - should not be present if empty ([] - became {} in database, should be null)
		const res = await this.consumableApi.add({
			...this.formGroup.value,
			type: this.getType(),
		} as ConsumableCreateData);

		// TODO: could return error if duplicate stats (consumableStats)

		// return;
		this.router.navigate(['items', this.getType()]);
	}

	public onCancel(): void {
		this.router.navigate(['items']);
	}

	private getType(): ConsumableType {
		return this.route.snapshot.queryParams['type'] == ItemType.Food ? ConsumableType.Food : ConsumableType.Potion;
	}
}
