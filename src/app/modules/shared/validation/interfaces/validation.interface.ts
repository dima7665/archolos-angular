import { WritableSignal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface ValidationControlElement {
	errorMessage: WritableSignal<string>;
	isShowError: WritableSignal<boolean>;
	name?: string;
	isRequired: WritableSignal<boolean>;
}

/**
 * @example
 * const validationMessages: ValidationMessage = {
 *     email: 'Email is not valid',
 *     minlength: ({ actualLength, requiredLength }) => `Min length is ${actualLength}/${requiredLength}`
 * }
 */
export type ValidationMessage = Partial<Record<string, string | ValidationMessageFunc>>;

/**
 * @example
 * ({ actualLength, requiredLength }) => `Min length is ${actualLength}/${requiredLength}`
 */
export type ValidationMessageFunc = <T>(errors: Readonly<ValidationErrors['errors']>, value?: Readonly<T>) => string;
