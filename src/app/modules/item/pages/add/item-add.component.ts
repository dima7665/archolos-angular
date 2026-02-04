import { Component } from '@angular/core';
import { itemTypeOptions } from '../../constants/item-option';
import { ItemForm } from './forms/item.form';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationModule } from 'app/modules/shared/validation/validation.module';
import { AppInputComponent } from 'app/modules/shared/form/modules/input/components/input.component';
import { AppSelectComponent } from 'app/modules/shared/form/modules/select/components/select.component';

@Component({
	selector: 'item-add',
	templateUrl: 'item-add.component.html',
	styleUrl: 'item-add.component.scss',
	imports: [ReactiveFormsModule, ValidationModule, AppInputComponent, AppSelectComponent],
})
export class ItemAddComponent {
	public formGroup = new ItemForm().formGroup;

	public readonly itemTypeOptions = itemTypeOptions;

	constructor(private readonly router: Router) {}

	public onSubmit(): void {
		console.log('add', this.formGroup.controls.type.invalid, this.formGroup.controls.type.value);
		// this.formGroup.triggerValidation();

		return;
		this.router.navigate(['items']);
	}

	public onCancel(): void {
		this.router.navigate(['items']);
	}
}
