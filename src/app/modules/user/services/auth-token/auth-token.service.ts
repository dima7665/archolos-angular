import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '@app/core/storage/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../../enums/token.enum';
import { Tokens } from '../../interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationTokenService {
	// use 'accessToken' property to set this value
	public readonly accessToken$ = new BehaviorSubject<Nullable<string>>(null);
	public readonly refreshToken$ = new BehaviorSubject<Nullable<string>>(null);

	// private readonly broadcastChannelService = inject(BroadcastChannelService);
	// private readonly workerConfigEventService = inject(WorkerConfigEventService);
	private readonly localStorageService = inject(LocalStorageService);

	constructor() {
		this.initData();
	}

	public get accessToken(): Nullable<string> {
		// return StorageHelper.deserialize(window.localStorage.getItem(Token.AccessToken));
		return this.localStorageService.get(Token.AccessToken);
	}

	public set accessToken(accessToken: Nullable<string>) {
		this.accessToken$.next(accessToken);
		this.localStorageService.set(Token.AccessToken, accessToken);

		// this.broadcastChannelService.postMessage<BroadcastConfigEvent>(BroadcastChannelName.Config, {
		// 	...this.workerConfigEventService.config,
		// 	accessToken,
		// });
	}

	public get refreshToken(): Nullable<string> {
		return this.refreshToken$.getValue();
	}

	public set refreshToken(refreshToken: Nullable<string>) {
		this.refreshToken$.next(refreshToken);
		this.localStorageService.set(Token.RefreshToken, refreshToken);
	}

	public setTokens({ accessToken, refreshToken }: Tokens): void {
		this.accessToken = accessToken;
		refreshToken && (this.refreshToken = refreshToken);
	}

	public clearTokens(): void {
		this.accessToken = null;
		this.refreshToken = null;
	}

	public updateTokens({ refreshToken, accessToken }: Tokens): void {
		if (accessToken) {
			this.accessToken = accessToken;
		}

		if (refreshToken) {
			this.refreshToken = refreshToken;
		}
	}

	public isAccessTokenExpiringSoon(seconds = 30): boolean {
		const token = this.accessToken;

		if (!token) return true;

		try {
			const tokenData = jwtDecode<{ exp: number }>(token);

			const exp = tokenData.exp;
			const now = Math.floor(Date.now() / 1000);

			return exp - now <= seconds;
		} catch (e) {
			// assume the token is expired if something goes wrong
			return true;
		}
	}

	public async initData(): Promise<void> {
		const accessToken = await this.localStorageService.getAsync<Nullable<string>>(Token.AccessToken);
		const refreshToken = await this.localStorageService.getAsync<Nullable<string>>(Token.RefreshToken);

		this.accessToken$.next(accessToken);
		this.refreshToken$.next(refreshToken);
	}
}
