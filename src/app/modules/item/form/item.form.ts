import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item, ItemCreateData } from '@app/modules/item/interfaces/item.interface';
import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';

export class ItemForm {
	public formGroup = new FormGroup<TypedForm<ItemCreateData>>({
		name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
		price: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
		gameItemId: new FormControl(''),
		description: new FormControl(''),
		additionalInfo: new FormControl(''),
		sources: new FormControl({ value: [], disabled: true }, { nonNullable: true }),
	});

	constructor(private readonly data: Partial<Item> = {}) {}
}
