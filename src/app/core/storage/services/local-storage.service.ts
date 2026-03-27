import { Injectable } from '@angular/core';
import { StorageSerializer } from '../class/storage-serializer';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
	public readonly storage = window.localStorage;

	private readonly storageSerializer = new StorageSerializer();

	public set<T>(key: string, value: T): boolean {
		try {
			this.storage.setItem(key, this.storageSerializer.serialize(value));

			return true;
		} catch (error) {
			console.error(error);

			return false;
		}
	}

	public get<T>(key: string): T | null {
		try {
			const data = this.storage.getItem(key) as string;

			return this.storageSerializer.deserialize(data);
		} catch (error) {
			console.error(error);

			return null;
		}
	}

	public remove(key: string): boolean {
		try {
			this.storage.removeItem(key);

			return true;
		} catch (error) {
			console.error(error);

			return false;
		}
	}

	public setAsync<T>(key: string, value: T): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			try {
				this.storage.setItem(key, this.storageSerializer.serialize(value));

				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}

	public getAsync<T>(key: string): Promise<T | null> {
		return new Promise<T | null>((resolve, reject) => {
			try {
				const data = this.storage.getItem(key) as string;

				resolve(this.storageSerializer.deserialize(data));
			} catch (error) {
				reject(error);
			}
		});
	}

	public removeAsync(key: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			try {
				this.storage.removeItem(key);

				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}
}
