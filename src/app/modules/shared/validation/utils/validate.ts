import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export const validate = (control: AbstractControl): ValidationErrors | null => {
	console.log('errors', control.errors);
	if (control.hasError('required')) {
		return Validators.required(control);
	}

	if (control.hasError('minlength')) {
		console.log('XXX - ', control.errors?.['minlength'], control.value);
		return { minlength: control.errors?.['minlength'] };
	}

	if (control.hasValidator(Validators.required)) {
		return Validators.required(control);
	}

	return null;
};
