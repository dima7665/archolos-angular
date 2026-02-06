import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationModule } from 'app/modules/shared/validation/validation.module';
import { VALIDATION_CONTROL_ELEMENT } from 'app/modules/shared/validation/token/validation.token';
import { ValidationControlElement } from 'app/modules/shared/validation/interfaces/validation.interface';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, ValidationModule],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppInputComponent), multi: true },
		{ provide: VALIDATION_CONTROL_ELEMENT, useExisting: AppInputComponent },
	],
})
export class AppInputComponent implements ControlValueAccessor, ValidationControlElement {
	public readonly label = input('');
	public readonly placeholder = input('');
	public readonly type = input<'number' | 'text' | 'email'>('text');

	public control!: FormControl;

	public readonly value = signal('');

	//
	public readonly errorMessage = signal('');
	public readonly isShowError = signal(false);
	public readonly isRequired = signal(false);
	//

	private isTouched = false;

	private onTouch!: () => void;
	private onChange!: (value: string | number | null) => void;

	public writeValue(value: string | null): void {
		console.log('writeValue', typeof value, value);
		this.value.set(value || '');
	}

	public registerOnChange(fn: (value: string | number | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	public onInput(event: Event): void {
		if (!(event.target instanceof HTMLInputElement)) {
			return;
		}

		const value = event.target.value.trim();

		this.markAsTouched();
		this.onChange(this.type() === 'number' ? parseInt(value) : value);
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
