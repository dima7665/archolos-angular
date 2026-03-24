import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	weaponDamageTypeOptions,
	weaponSkillTypeOptions,
	weaponTypeOptions,
} from '@app/modules/item/constants/weapon-option';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { AppSelectComponent } from '@app/modules/shared/form/modules/select/components/select.component';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { WeaponCreateData, WeaponItem } from '../../interfaces/weapon.interface';
import { WeaponForm } from '../../form/weapon.form';
import { ActivatedRoute, Router } from '@angular/router';
import { WeaponApi } from '../../api/weapon.api';
import { ItemType } from '@app/modules/item/enums/item-type.enum';

@Component({
	selector: 'weapon-form',
	templateUrl: './weapon-form.component.html',
	styleUrl: './weapon-form.component.scss',
	imports: [ReactiveFormsModule, ValidationModule, AppInputComponent, AppSelectComponent],
})
export class WeaponFormComponent {
	public readonly item = input<Nullable<WeaponItem>>(null);

	public readonly weaponTypeOptions = weaponTypeOptions;
	public readonly damageTypeOptions = weaponDamageTypeOptions;
	public readonly skillTypeOptions = weaponSkillTypeOptions;

	public readonly formGroup = new WeaponForm().formGroup;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly weaponApi: WeaponApi
	) {}

	public async onSubmit(): Promise<void> {
		// TODO: amount input (for price - only numbers allowed)
		// TODO: also add backend error validation higlights

		if (this.formGroup.invalid) {
			this.formGroup.triggerValidation();
			return;
		}

		// TODO: fix sources - should not be present if empty ([] - became {} in database, should be null)

		const res = await this.weaponApi.add(this.formGroup.value as WeaponCreateData);

		this.router.navigate(['items', ItemType.Weapon]);
	}

	public onCancel(): void {
		this.router.navigate(['items', ItemType.Weapon]);
	}
}
