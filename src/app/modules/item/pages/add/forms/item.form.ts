import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemType } from 'app/modules/item/enums/item-type.enum';

export class ItemForm {
	public formGroup = new FormGroup({
		type: new FormControl(ItemType.Other, { nonNullable: true, validators: [Validators.required] }),
		// name: new FormControl('', { nonNullable: true }),
		name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
		price: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
		gameItemId: new FormControl(''),
		description: new FormControl(''),
		additionalInfo: new FormControl(''),
	});
}
