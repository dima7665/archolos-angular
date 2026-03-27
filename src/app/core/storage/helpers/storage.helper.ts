export abstract class StorageHelper {
	public static deserialize<T>(storedValue: string | null): T | null {
		if (storedValue === null || storedValue === '') {
			return null;
		}

		try {
			return JSON.parse(storedValue);
		} catch (e) {
			return storedValue as unknown as T;
		}
	}
}
