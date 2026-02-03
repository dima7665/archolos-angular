import { Directive, inject, inputBinding, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationErrorComponent } from '../components/validation-error.component';

@Directive({
	selector: '[controlValidation]',
})
export class ControlValidationDirective implements OnInit, OnDestroy {
	public readonly vcr = inject(ViewContainerRef);
	public readonly ngControl = inject(NgControl, { host: true });

	public ngOnInit(): void {
		this.vcr.createComponent(ValidationErrorComponent, {
			bindings: [inputBinding('control', () => this.ngControl)],
		});
	}

	public ngOnDestroy(): void {
		this.vcr.clear();
	}
}
