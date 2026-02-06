import { AbstractControl, FormGroup, UntypedFormArray } from '@angular/forms';
import { Subject } from 'rxjs';

declare module '@angular/forms' {
	interface AbstractControl {
		/** A multicasting observable that emits an event every time the triggerValidation unction has been called */
		validationTrigger$: Subject<void>;

		/** Mark controls as touched and notifies custom validation to show errors of validation-field */
		triggerValidation(): void;
	}
}

AbstractControl.prototype.validationTrigger$ = new Subject();

AbstractControl.prototype.triggerValidation = function (): void {
	// Avoid scrolling and touching disabled fields
	if (this.disabled) {
		return;
	}

	this.markAsTouched();
	this.validationTrigger$.next();
};

FormGroup.prototype.triggerValidation = function (): void {
	Object.values(this.controls).forEach(control => control.triggerValidation());
};

UntypedFormArray.prototype.triggerValidation = function (): void {
	this.controls.forEach(control => control.triggerValidation());
};
