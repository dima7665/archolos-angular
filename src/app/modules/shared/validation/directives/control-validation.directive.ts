import { Directive, effect, inject, input, inputBinding, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { ValidationMessage } from '../interfaces/validation.interface';
import { debounceTime, startWith } from 'rxjs';
import { extractTouches } from '../utils/extract-touches';
import { VALIDATION_CONTROL_ELEMENT } from '../token/validation.token';
import { extractValidatorsChanges } from '../utils/extract-validators';
import { isRequiredControl } from '../utils/is-required-control';
import { SubSink } from 'subsink';

@Directive({
	selector: '[controlValidation]',
})
export class ControlValidationDirective implements OnInit, OnDestroy {
	public readonly messagesOrEmpty = input<ValidationMessage | ''>('', { alias: 'controlValidation' });
	// public readonly options = input<ValidationOptions>({});

	private control!: FormControl;
	private isInited = false;
	private messages: ValidationMessage = {};

	private subs = new SubSink();

	private readonly ngControl = inject(NgControl, { host: true });
	private readonly element = inject(VALIDATION_CONTROL_ELEMENT, { host: true });

	constructor() {
		effect(() => {
			this.messages = this.messagesOrEmpty() || {};
		});
	}

	public ngOnInit(): void {
		this.control = this.ngControl.control as FormControl;

		this.subs.sink = extractValidatorsChanges(this.control)
			.pipe(startWith(true))
			.subscribe(() => this.element.isRequired.set(isRequiredControl(this.control)));

		this.subs.sink = this.control.valueChanges?.pipe(debounceTime(15)).subscribe(() => this.validate());

		this.subs.sink = extractTouches(this.control)
			.pipe(debounceTime(15))
			.subscribe(() => this.validate());
	}

	public ngAfterViewChecked(): void {
		this.isInited = true;
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	private validate(): void {
		if (!this.isInited) {
			return;
		}

		const { value, invalid, dirty, touched, errors } = this.control;

		this.element.isShowError.set(invalid && (dirty || touched));
		this.element.errorMessage.set(this.getErrorMessage(errors || {}, this.messages, value));
	}

	private getErrorMessage<T>(allErrors: ValidationErrors, messages?: ValidationMessage, value?: Readonly<T>): string {
		const errors = Object.entries(this.control.errors || {});

		const error = errors.length ? errors[0][0] : '';

		return error; // TODO: errors map

		// const allMessages = messages ? { ...this.allMessages, ...messages } : this.allMessages;

		// for (const errorKey in allErrors) {
		// 	if (Object.prototype.hasOwnProperty.call(allErrors, errorKey)) {
		// 		const errors = allErrors[errorKey];
		// 		const message = extractMessage(allMessages, errorKey, errors, value);

		// 		if (message) {
		// 			return message;
		// 		}

		// 		console.error(`No error message found for "${errorKey}" error key`);
		// 	}
		// }

		// return '';
	}
}

// @Directive({
// 	selector: '[controlValidation]',
// })
// export class ControlValidationDirective implements OnInit, OnDestroy {
// 	public readonly vcr = inject(ViewContainerRef);
// 	public readonly ngControl = inject(NgControl, { host: true });

// 	public ngOnInit(): void {
// 		this.vcr.createComponent(ValidationErrorComponent, {
// 			bindings: [inputBinding('control', () => this.ngControl)],
// 		});
// 	}

// 	public ngOnDestroy(): void {
// 		this.vcr.clear();
// 	}
// }
