import { Injectable } from "@angular/core";
import { LocalStorageService } from "@app/core/storage/services/local-storage.service";
import { v4 as uuid } from 'uuid';

@Injectable({
	providedIn: 'root',
})
export class FingerprintService {
	private readonly storageKey = 'fingerprint';

	constructor(private readonly localStorageService: LocalStorageService) {}

	public async withFingerprint<T extends object>(item: T): Promise<T & { fingerprint: string }> {
		const fingerprint = await this.getFingerprint();

		return { ...item, fingerprint };
	}

	public async getFingerprint(): Promise<string> {
		const fingerprint = await this.localStorageService.getAsync<Nullable<string>>(this.storageKey);

		if (fingerprint) {
			return fingerprint;
		}

		const newFingerprint = uuid();
		await this.localStorageService.setAsync(this.storageKey, newFingerprint);

		return newFingerprint;
	}
}
