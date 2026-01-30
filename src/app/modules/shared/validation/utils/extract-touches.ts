import { AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ControlEventArgs, ControlObject } from '../interfaces/control.interface';

export const extractTouches = (
	control: ControlObject<AbstractControl, 'markAsTouched' | 'markAsUntouched'>
): Observable<boolean> => {
	const prevMarkAsTouched = control.markAsTouched;
	const prevMarkAsUntouched = control.markAsUntouched;

	const touchedChanges$ = new Subject<boolean>();

	function nextMarkAsTouched(...args: ControlEventArgs<AbstractControl['markAsTouched']>): void {
		prevMarkAsTouched.bind(control)(...args);
		touchedChanges$.next(true);
	}

	function nextMarkAsUntouched(...args: ControlEventArgs<AbstractControl['markAsUntouched']>): void {
		prevMarkAsUntouched.bind(control)(...args);
		touchedChanges$.next(false);
	}

	control.markAsTouched = nextMarkAsTouched;
	control.markAsUntouched = nextMarkAsUntouched;

	return touchedChanges$;
};
