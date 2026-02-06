import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'app/modules/item/interfaces/item.interface';
import { TypedForm } from 'app/modules/shared/form/interfaces/typed-form.interface';
import { ConsumableStat, ConsumableStatType } from '../interfaces/consumable.interface';

export class ConsumableStatForm {
	public formGroup = new FormGroup<TypedForm<ConsumableStat>>({
		consumableId: new FormControl(this.data.consumableId!, { nonNullable: true, validators: [Validators.required] }),
		duration: new FormControl(this.data.duration || 0, { validators: [Validators.min(0)] }),
		isPercentage: new FormControl(!!this.data.isPercentage, { nonNullable: true }),
		isPermanent: new FormControl(!!this.data.isPermanent, { nonNullable: true }),
		stat: new FormControl(this.data.stat || ConsumableStatType.Health, { nonNullable: true, validators: [Validators.required] }),
		value: new FormControl(this.data.value || 0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
	});

	constructor(private readonly data: Partial<ConsumableStat> = {}) {}
}
