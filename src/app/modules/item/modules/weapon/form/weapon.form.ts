import { ItemForm } from '@app/modules/item/form/item.form';
import { WeaponItem } from '../interfaces/weapon.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';
import { WeaponDamageType, WeaponSkill, WeaponType } from '../enums/weapon.enum';

export class WeaponForm {
	private readonly baseFormGroup = new ItemForm(this.data).formGroup;

	public formGroup = new FormGroup<TypedForm<Omit<WeaponItem, 'id' | 'asIngredient' | 'recipes'>>>({
		...this.baseFormGroup.controls,

		type: new FormControl(this.data.type || WeaponType.Onehanded, {
			nonNullable: true,
			validators: [Validators.required],
		}),
		damage: new FormControl(this.data.damage!, {
			nonNullable: true,
			validators: [Validators.required, Validators.min(0)],
		}),
		damageType: new FormControl(this.data.damageType || WeaponDamageType.Blade, {
			nonNullable: true,
			validators: [Validators.required],
		}),
		range: new FormControl(this.data.range),
		armorPiercing: new FormControl(this.data.armorPiercing),
		skill: new FormControl(this.data.skill || WeaponSkill.Onehanded, {
			nonNullable: true,
			validators: [Validators.required],
		}),
		skillRequirement: new FormControl(this.data.skillRequirement),
		skillBonus: new FormControl(this.data.skillBonus),
	});

	constructor(private readonly data: Partial<WeaponItem> = {}) {}
}
