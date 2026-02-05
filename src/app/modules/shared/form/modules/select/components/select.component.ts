import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ValidationControlElement } from 'app/modules/shared/validation/interfaces/validation.interface';
import { VALIDATION_CONTROL_ELEMENT } from 'app/modules/shared/validation/token/validation.token';
import { ValidationModule } from 'app/modules/shared/validation/validation.module';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	imports: [MatFormFieldModule, MatSelectModule, ValidationModule],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppSelectComponent), multi: true },
		{ provide: VALIDATION_CONTROL_ELEMENT, useExisting: AppSelectComponent },
	],
})
export class AppSelectComponent implements ControlValueAccessor, ValidationControlElement {
	public readonly options = input.required<any[]>();

	public control!: FormControl;

	public readonly value = signal('');

	//
	public errorMessage = signal('');
	public isShowError = signal(false);
	public isRequired = signal(false);
	//

	private onTouch!: () => void;
	private onChange!: (value: string | null) => void;

	private isTouched = false;

	public writeValue(value: string | null): void {
		this.value.set(value || '');
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	public onSelection(event: MatSelectChange): void {
        this.markAsTouched();
		this.onChange(event.value);
		this.onTouch();
	}

	public onBlur(): void {
		this.markAsTouched();
	}

	private markAsTouched() {
		if (!this.isTouched) {
			this.onTouch();
			this.isTouched = true;
		}
	}
}
