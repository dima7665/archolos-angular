import {
	LoginBroadcastMessage,
	LogoutBroadcastMessage,
	TokensUpdateBroadcastMessage,
} from '../messages/user-broadcast-auth';

export type UserBroadcastMessages = LoginBroadcastMessage | LogoutBroadcastMessage | TokensUpdateBroadcastMessage;
