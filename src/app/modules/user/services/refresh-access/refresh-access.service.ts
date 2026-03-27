import { catchError, finalize, from, map, Observable, shareReplay, switchMap, take, tap, throwError } from 'rxjs';
import { RefreshAccessAbstract } from './refresh-access.abstract';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { IGNORE_NOTIFY_ERROR } from '@app/core/http/interceptors/notify-error/notify-error.token';
import { HttpContext } from '@angular/common/http';
import { FingerprintService } from '@app/core/fingerprint/services/fingerprint.service';
import { Tokens } from '../../interfaces/user.interface';
import { IS_TOKEN_REQUEST } from '@app/core/http/tokens/is-token-request.token';
import { UserAuthApi } from '../../api/auth/user-auth.api';
import { AuthenticationTokenService } from '../auth-token/auth-token.service';

@Injectable({
	providedIn: 'root',
	// useFactory: () => {
	// 	if (!WorkerHelper.isSharedWorkerSupported()) {
	// 		return new RefreshAccessService();
	// 	}

	// 	return new RefreshAccessWorkerService();
	// },
})
export class RefreshAccessService extends RefreshAccessAbstract {
	public refreshToken$: Observable<string> | null = null;

	private readonly authApi = inject(UserAuthApi);
	private readonly fingerprintService = inject(FingerprintService);

	constructor() {
		super();
	}

	public token(): Observable<string> {
		if (this.refreshToken$) {
			return this.refreshToken$;
		}

		const context = new HttpContext()
			// .set(NGX_LOADING_BAR_IGNORED, true)
			.set(IGNORE_NOTIFY_ERROR, true)
			.set(IS_TOKEN_REQUEST, true);

		this.refreshToken$ = this.authenticationTokenService.refreshToken$.pipe(take(1)).pipe(
			switchMap((token) => this.authApi.refreshToken({ token }, { context })),
			tap((resp) => this.authenticationTokenService.updateTokens(resp)),
			map((resp) => resp.accessToken),
			catchError((error) => {
				this.refreshToken$ = null;
				return throwError(() => error);
			}),
			//@ts-ignore
			finalize(() => (this.refreshToken$ = null)),
			shareReplay(1)
		);

		return this.refreshToken$;
	}
}
