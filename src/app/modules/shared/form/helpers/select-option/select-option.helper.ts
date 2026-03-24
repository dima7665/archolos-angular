import { SelectOption, SelectOptionBackend } from '../../interfaces/select-option.interface';

export abstract class SelectOptionHelper {
	public static toOptions(rawOptions: SelectOptionBackend[]): SelectOption[] {
		return rawOptions.map((o) => ({ text: o.name, key: o.id }));
	}
}
