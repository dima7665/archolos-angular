import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { itemTypeOptions } from '../../constants/item-option';
import { ItemForm } from './forms/item.form';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ControlValidationDirective } from 'app/modules/shared/validation/directives/control-validation.directive';

@Component({
	selector: 'item-add',
	templateUrl: 'item-add.component.html',
	styleUrl: 'item-add.component.scss',
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ControlValidationDirective],
})
export class ItemAddComponent {
	public formGroup = new ItemForm().formGroup;

	public readonly itemTypeOptions = itemTypeOptions;

	constructor(private readonly router: Router) {}

	public onSubmit(): void {
		console.log('add', this.formGroup.controls.name.errors);

        return;
        this.router.navigate(['items']);
	}

	public onCancel(): void {
		this.router.navigate(['items']);
	}
}
