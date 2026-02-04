import { Component, computed, forwardRef, input, signal } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormsModule,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	ValidationErrors,
	Validator,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationModule } from 'app/modules/shared/validation/validation.module';
import { VALIDATION_CONTROL_ELEMENT } from 'app/modules/shared/validation/token/validation.token';
import { ValidationControlElement } from 'app/modules/shared/validation/interfaces/validation.interface';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
	imports: [
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		FormsModule,
		ValidationModule,
	],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AppInputComponent), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => AppInputComponent), multi: true },
		{ provide: VALIDATION_CONTROL_ELEMENT, useExisting: AppInputComponent },
	],
})
export class AppInputComponent implements ControlValueAccessor, Validator, ValidationControlElement {
	public readonly label = input('');
	public readonly placeholder = input('');
	public readonly type = input<'number' | 'text' | 'email'>('text');

	// public control = new FormControl('');
	public control!: FormControl;

	public readonly value = signal('');

	private onTouch!: () => void;
	private onChange!: (value: string | null) => void;

	public readonly errors = signal<ValidationErrors | null>(null);
	public readonly hasErrors = computed<boolean>(() => !!this.errors());

	//
	public errorMessage = signal('');
	public isShowError = signal(false);
	public isRequired = signal(false);
	//

	public readonly isTouched = signal(false);

	public writeValue(value: string | null): void {
		// this.control.setValue(value, { emitEvent: false });
		this.value.set(value || '');
	}

	public registerOnChange(fn: (value: string | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	// cannot inject control because of circular dependency, so get it here
	public validate(control: AbstractControl): ValidationErrors | null {
		if (!this.control) {
			this.control = control as FormControl;
			this.isRequired.set(this.control.hasValidator(Validators.required));
		}

		return null;
	}

	public onInput(event: Event): void {
		if (!(event.target instanceof HTMLInputElement)) {
			return;
		}

		this.markAsTouched();
		this.onChange(event.target.value.trim());
		this.onTouch();
		this.setErrors();
	}

	public onBlur(): void {
		this.markAsTouched();
		this.setErrors();
	}

	private markAsTouched() {
		if (!this.isTouched()) {
			this.onTouch();
			this.isTouched.set(true);
		}
	}

	private setErrors(): void {
		this.errors.set(this.control.errors);
	}
}
