import { AbstractControl, FormControl } from "@angular/forms";

export type TypedForm<T extends object> = {
	[K in keyof T]-?: NonUndefined<T[K]> extends AbstractControl ? T[K] : FormControl<T[K]>;
};
