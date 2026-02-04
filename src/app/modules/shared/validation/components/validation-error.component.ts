import { Component, input } from '@angular/core';
import { MatError } from '@angular/material/select';

@Component({
	selector: 'validation-error',
	template: `
		@if (isShow() && error()) {
			<mat-error>{{ error() }}</mat-error>
		}
	`,
	styleUrl: './validation-error.component.scss',
	imports: [MatError],
})
export class ValidationErrorComponent {
	public readonly error = input<string | null>(null);
	public readonly isShow = input(true);
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
