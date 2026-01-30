import {
	Directive,
	ElementRef,
	Host,
	inputBinding,
	OnDestroy,
	OnInit,
	Renderer2,
	ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidationErrorComponent } from '../components/validation-error.component';

@Directive({
	selector: '[controlValidation]',
})
export class ControlValidationDirective implements OnInit, OnDestroy {
	constructor(
		private readonly vcr: ViewContainerRef,
		@Host() private readonly ngControl: NgControl
	) {}

	public ngOnInit(): void {
		this.vcr.createComponent(ValidationErrorComponent, {
			bindings: [inputBinding('control', () => this.ngControl)],
		});
	}

	public ngOnDestroy(): void {
		this.vcr.clear();
	}
}
