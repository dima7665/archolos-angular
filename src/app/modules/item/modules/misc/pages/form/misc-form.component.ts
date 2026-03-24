import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Item, ItemCreateData } from '@app/modules/item/interfaces/item.interface';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { MiscApi } from '../../api/misc.api';
import { ItemForm } from '@app/modules/item/form/item.form';
import { ItemType } from '@app/modules/item/enums/item-type.enum';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';

@Component({
	selector: 'misc-form',
	templateUrl: './misc-form.component.html',
	styleUrl: './misc-form.component.scss',
	imports: [ReactiveFormsModule, AppInputComponent, ValidationModule],
})
export class MiscFormComponent {
	public readonly item = input<Nullable<Item>>(null);

	public readonly formGroup = new ItemForm().formGroup;

	constructor(
		private readonly router: Router,
		private readonly miscApi: MiscApi
	) {}

	public async onSubmit(): Promise<void> {
		// TODO: amount input (for price - only numbers allowed)
		// TODO: also add backend error validation higlights

		if (this.formGroup.invalid) {
			this.formGroup.triggerValidation();
			return;
		}

		// TODO: fix sources - should not be present if empty ([] - became {} in database, should be null)

		const res = await this.miscApi.add(this.formGroup.value as ItemCreateData);

		this.router.navigate(['items', ItemType.Other]);
	}

	public onCancel(): void {
		this.router.navigate(['items', ItemType.Other]);
	}
}
