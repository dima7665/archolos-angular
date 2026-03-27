import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationTokenService } from "../auth-token/auth-token.service";
import { AppConfigService } from "@app/core/app-config/app-config.service";

export abstract class RefreshAccessAbstract {
	public readonly appConfigService = inject(AppConfigService);
	public readonly authApiConfig = AuthApiConfig;
	public readonly authenticationTokenService = inject(AuthenticationTokenService);

	public abstract refreshToken$: Observable<string> | null;
	public abstract token(): Observable<string>;

	public catchErrorToken(url: string): void {
		// if (!WorkerHelper.isSharedWorkerSupported() && this.isCriticalRequest(url)) {
		// 	return;
		// }

		this.authenticationTokenService.clearTokens();

		// window.location.reload();
	}

	private isCriticalRequest(url: string): boolean {
		const externalApiUrl = this.appConfigService.externalApiUrl;
		const criticalEndpoints = [
			`${externalApiUrl}${CounterConfig.COUNTER}`,
			`${externalApiUrl}${SocketApiConfig.BROADCASTING}`,
		];

		return criticalEndpoints.some(endpoint => url.includes(endpoint));
	}
}

export abstract class SocketApiConfig {
	public static readonly BROADCASTING = '/broadcasting/auth';
}

export abstract class CounterConfig {
	public static readonly COUNTER = '/counters';
}

export abstract class AuthApiConfig {
	public static readonly TOKEN = '/auth/refresh-token';
}
