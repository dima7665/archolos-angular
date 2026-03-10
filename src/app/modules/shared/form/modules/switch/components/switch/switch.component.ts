import { Component, forwardRef, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ValidationControlElement } from '@app/modules/shared/validation/interfaces/validation.interface';
import { VALIDATION_CONTROL_ELEMENT } from '@app/modules/shared/validation/token/validation.token';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';

@Component({
	selector: 'app-switch',
	templateUrl: './switch.component.html',
	styleUrl: './switch.component.scss',
	imports: [MatSlideToggleModule, ValidationModule],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SwitchComponent), multi: true },
		{ provide: VALIDATION_CONTROL_ELEMENT, useExisting: SwitchComponent },
	],
})
export class SwitchComponent implements ControlValueAccessor, ValidationControlElement {
	public readonly value = model(false);
  
	//
	public errorMessage = signal('');
	public isShowError = signal(false);
	public isRequired = signal(false);
	//

	private onTouch!: () => void;
	private onChange!: (value: boolean | null) => void;

	private isTouched = false;

	public writeValue(value: boolean | null): void {
		this.value.set(value || false);
	}

	public registerOnChange(fn: (value: boolean | null) => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	public onToggleChange(event: MatSlideToggleChange): void {
		this.markAsTouched();
		this.onChange ? this.onChange(event.checked) : (this.value.set(event.checked));
		this.onTouch?.();
	}

	public onBlur(): void {
		this.markAsTouched();
	}

	private markAsTouched() {
		if (!this.isTouched) {
			this.onTouch?.();
			this.isTouched = true;
		}
	}
}
