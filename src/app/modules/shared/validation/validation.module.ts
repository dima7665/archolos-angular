import { NgModule } from '@angular/core';
import { ControlValidationDirective } from './directives/control-validation.directive';

import './prototype/abstract-control.prototype';

@NgModule({
	imports: [ControlValidationDirective],
	exports: [ControlValidationDirective],
})
export class ValidationModule {}
