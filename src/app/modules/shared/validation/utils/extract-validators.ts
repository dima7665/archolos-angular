import { AbstractControl } from '@angular/forms';
import { ControlEventArgs, ControlObject } from '../interfaces/control.interface';
import { Observable, Subject } from 'rxjs';

export const extractValidatorsChanges = (
	control: ControlObject<AbstractControl, 'addValidators' | 'removeValidators' | 'setValidators' | 'clearValidators'>
): Observable<boolean> => {
	const prevAddValidators = control.addValidators;
	const prevRemoveValidators = control.removeValidators;
	const prevSetValidators = control.setValidators;
	const prevClearValidators = control.clearValidators;

	const validatorsChanges$ = new Subject<boolean>();

	function nextAddValidators(...args: ControlEventArgs<AbstractControl['addValidators']>): void {
		prevAddValidators.bind(control)(...args);
		validatorsChanges$.next(false);
	}

	function nextRemoveValidators(...args: ControlEventArgs<AbstractControl['removeValidators']>): void {
		prevRemoveValidators.bind(control)(...args);
		validatorsChanges$.next(true);
	}

	function nextSetValidators(...args: ControlEventArgs<AbstractControl['setValidators']>): void {
		prevSetValidators.bind(control)(...args);
		validatorsChanges$.next(true);
	}

	function nextClearValidators(...args: ControlEventArgs<AbstractControl['clearValidators']>): void {
		prevClearValidators.bind(control)(...args);
		validatorsChanges$.next(true);
	}

	control.clearValidators = nextClearValidators;
	control.addValidators = nextAddValidators;
	control.removeValidators = nextRemoveValidators;
	control.setValidators = nextSetValidators;

	return validatorsChanges$;
};
