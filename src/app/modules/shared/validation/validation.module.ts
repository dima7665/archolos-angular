import { NgModule } from '@angular/core';
import { ControlValidationDirective } from './directives/control-validation.directive';

import './prototype/abstract-control.prototype';
import { ValidationErrorComponent } from './components/validation-error.component';

@NgModule({
	imports: [ControlValidationDirective, ValidationErrorComponent],
	exports: [ControlValidationDirective, ValidationErrorComponent],
})
export class ValidationModule {}
