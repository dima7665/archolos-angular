import { AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ControlEventArgs, ControlObject } from '../interfaces/control.interface';

export const extractDirty = (
	control: ControlObject<AbstractControl, 'markAsDirty' | 'markAsPristine'>
): Observable<boolean> => {
	const prevMarkAsDirty = control.markAsDirty;
	const prevMarkAsPristine = control.markAsPristine;

	const dirtyChanges$ = new Subject<boolean>();

	function nextMarkAsDirty(...args: ControlEventArgs<AbstractControl['markAsDirty']>): void {
		prevMarkAsDirty.bind(control)(...args);
		dirtyChanges$.next(false);
	}

	function nextMarkAsPristine(...args: ControlEventArgs<AbstractControl['markAsPristine']>): void {
		prevMarkAsPristine.bind(control)(...args);
		dirtyChanges$.next(true);
	}

	control.markAsDirty = nextMarkAsDirty;
	control.markAsPristine = nextMarkAsPristine;

	return dirtyChanges$;
};
