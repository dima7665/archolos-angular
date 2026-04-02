import { Tokens, User } from '@app/modules/user/interfaces/user.interface';
import { BroadcastMessage } from '../../interfaces/broadcast-message.interface';
import { BroadcastEventKey } from '../../enums/broadcast-event.enum';

interface LoginBroadcastData {
	user: User;
	tokens: Tokens;
}

interface LogoutBroadcastData {
	token?: Nullable<string>;
}

type TokensUpdateBroadcastData = Tokens;

export class LoginBroadcastMessage implements BroadcastMessage<LoginBroadcastData> {
	public readonly key = BroadcastEventKey.Login;
	public data!: LoginBroadcastData;

	constructor(data: LoginBroadcastData) {
		this.data = data;
	}
}

export class LogoutBroadcastMessage implements BroadcastMessage<LogoutBroadcastData> {
	public readonly key = BroadcastEventKey.Logout;
	public data!: LogoutBroadcastData;

	constructor(token?: Nullable<string>) {
		this.data = { token };
	}
}

export class TokensUpdateBroadcastMessage implements BroadcastMessage<TokensUpdateBroadcastData> {
	public readonly key = BroadcastEventKey.TokensUpdate;
	public data!: TokensUpdateBroadcastData;

	constructor(data: TokensUpdateBroadcastData) {
		this.data = data;
	}
}
