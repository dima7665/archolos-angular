import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export const validate = (control: AbstractControl): ValidationErrors | null => {
	if (control.hasError('required')) {
		return Validators.required(control);
	}

	if (control.hasError('minlength')) {
		return { minlength: control.errors?.['minlength'] };
	}

	if (control.hasValidator(Validators.required)) {
		return Validators.required(control);
	}

	return null;
};
