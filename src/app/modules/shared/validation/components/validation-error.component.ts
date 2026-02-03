import { Component, effect, input, signal } from '@angular/core';
import { FormControl, NgControl, ValidationErrors } from '@angular/forms';
import { MatError } from '@angular/material/select';
import { debounceTime } from 'rxjs';
import { extractTouches } from '../utils/extract-touches';

@Component({
	selector: 'validation-error',
	template: `
		@if (errorMessage()) {
			<mat-error>{{ errorMessage() }}</mat-error>
		}
	`,
	styleUrl: './validation-error.component.scss',
	imports: [MatError],
})
export class ValidationErrorComponent {
	public readonly errors = input<ValidationErrors | null>(null);

	public errorMessage = signal('');

	constructor() {
		effect(() => {
			// console.log('val er - ', this.errors());
			const errors = Object.entries(this.errors() || {});

			const error = errors.length ? errors[0][0] : '';

			this.errorMessage.set(error);
		});
	}
}

// @Component({
// 	selector: 'validation-error',
// 	template: `
// 		@if (errorMessage()) {
// 			<mat-error>{{ errorMessage() }}</mat-error>
// 		}
// 	`,
// 	styleUrl: './validation-error.component.scss',
// 	imports: [MatError],
// })
// export class ValidationErrorComponent {
// 	public readonly control = input.required<NgControl>();

// 	public errorMessage = signal('');

// 	public ngOnInit(): void {
// 		this.control()
// 			.valueChanges?.pipe(debounceTime(15))
// 			.subscribe(() => this.validate());

// 		extractTouches(this.control().control as FormControl)
// 			.pipe(debounceTime(15))
// 			.subscribe(() => this.validate());
// 	}

// 	private validate(): void {
// 		const errors = Object.entries(this.control().errors || {});

// 		const error = errors.length ? errors[0][0] : '';

// 		this.errorMessage.set(error); // TODO: errors map
// 	}
// }
