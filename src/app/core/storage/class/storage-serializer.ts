import { StorageHelper } from "../helpers/storage.helper";

export class StorageSerializer {
	public serialize<T>(value: T): string {
		return JSON.stringify(value);
	}

	public deserialize<T>(storedValue: string | null): T | null {
		return StorageHelper.deserialize<T>(storedValue);
	}
}
