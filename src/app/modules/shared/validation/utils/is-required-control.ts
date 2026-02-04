import { AbstractControl, FormControl } from '@angular/forms';

export const isRequiredControl = (abstractControl: AbstractControl | null): boolean => {
	if (!abstractControl?.validator) {
		return false;
	}

	const validator = abstractControl.validator({} as FormControl);
	return validator && validator['required'];
};
