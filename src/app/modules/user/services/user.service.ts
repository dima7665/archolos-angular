import { computed, Injectable, signal } from '@angular/core';
import { Tokens, User } from '../interfaces/user.interface';
import { UserAuthApi } from '../api/auth/user-auth.api';

@Injectable({ providedIn: 'root' })
export class UserService {
	public readonly user = computed(() => this._user());

	public readonly accessToken = computed(() => this._accessToken());
	public readonly refreshToken = computed(() => this._refreshToken());

	private readonly _user = signal<User | null>(null);
	private readonly _refreshToken = signal<string | null>(null);
	private readonly _accessToken = signal<string | null>(null);

	constructor(private readonly userAuthApi: UserAuthApi) {}

	public setUser(data: User): void {
		this._user.set(data);
	}

	public setTokens({ accessToken, refreshToken }: Tokens): void {
		this._accessToken.set(accessToken);
		refreshToken && this._refreshToken.set(refreshToken);
	}

	public clear(): void {
		this._user.set(null);
		this._accessToken.set(null);
		this._refreshToken.set(null);
	}

	public async login(data: { email: string; password: string }): Promise<User> {
		const { accessToken, refreshToken, ...user } = await this.userAuthApi.login(data);

		this.setUser(user);
		this.setTokens({ accessToken, refreshToken });

		return user;
	}

	public async logout(): Promise<void> {
		try {
			await this.userAuthApi.logout();
		} finally {
			this.clear();
		}
	}
}
