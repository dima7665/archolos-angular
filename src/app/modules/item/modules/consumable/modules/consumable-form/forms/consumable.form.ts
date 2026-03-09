import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';
import { ConsumableItem } from '../../../interfaces/consumable.interface';
import { ItemForm } from '@app/modules/item/form/item.form';
import { ConsumableStatForm } from './consumable-stat.form';

export class ConsumableForm {
private readonly baseFormGroup = new ItemForm(this.data).formGroup;

	public formGroup = new FormGroup<TypedForm<Omit<ConsumableItem, 'id' | 'asIngredient' | 'recipes'>>>({
		...this.baseFormGroup.controls,

		type: new FormControl<any>(this.data.type),
		consumableStats: new FormArray<ConsumableStatForm['formGroup']>([]) as unknown as FormControl,
	});

	constructor(private readonly data: Partial<ConsumableItem> = {}) {}
}
