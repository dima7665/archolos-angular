import { computed, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../interfaces/user.interface';
import { UserAuthApi } from '../api/auth/user-auth.api';
import { AuthenticationTokenService } from './auth-token/auth-token.service';
import { LoginBroadcastMessage, LogoutBroadcastMessage } from '@app/core/broadcast/user/messages/user-broadcast-auth';
import { UserBroadcastService } from '@app/core/broadcast/user/services/user-broadcast.service';
import { BroadcastEventKey } from '@app/core/broadcast/enums/broadcast-event.enum';

@Injectable({ providedIn: 'root' })
export class UserService {
	public readonly user = computed(() => this._user());

	public readonly accessToken = toSignal(this.authenticationTokenService.accessToken$);
	public readonly refreshToken = toSignal(this.authenticationTokenService.refreshToken$);

	private readonly _user = signal<User | null>(null);

	constructor(
		private readonly userAuthApi: UserAuthApi,
		private readonly authenticationTokenService: AuthenticationTokenService,
		private readonly userBroadcastService: UserBroadcastService
	) {
		this.userBroadcastService.on(BroadcastEventKey.Login).subscribe((data) => {
			this.setUser(data.user);
			this.authenticationTokenService.setTokens(data.tokens);
		});

		this.userBroadcastService.on(BroadcastEventKey.Logout).subscribe((data) => this.clear());
	}

	public setUser(data: User): void {
		this._user.set(data);
	}

	public clear(): void {
		this._user.set(null);
		this.authenticationTokenService.clearTokens();
	}

	public async login(data: { email: string; password: string }): Promise<User> {
		const { tokens, user } = await this.userAuthApi.login(data);

		this.setUser(user);
		this.authenticationTokenService.setTokens(tokens);
		this.userBroadcastService.sendMessage(new LoginBroadcastMessage({ user, tokens }));

		return user;
	}

	public async logout(): Promise<void> {
		try {
			await this.userAuthApi.logout(this.refreshToken()!);
		} finally {
			this.clear();
			this.userBroadcastService.sendMessage(new LogoutBroadcastMessage(this.refreshToken()));
		}
	}
}
