import { catchError, finalize, map, Observable, shareReplay, switchMap, take, tap, throwError } from 'rxjs';
import { RefreshAccessAbstract } from './refresh-access.abstract';
import { inject, Injectable } from '@angular/core';
import { IGNORE_NOTIFY_ERROR } from '@app/core/http/interceptors/notify-error/notify-error.token';
import { HttpContext } from '@angular/common/http';
import { IS_TOKEN_REQUEST } from '@app/core/http/tokens/is-token-request.token';
import { UserAuthApi } from '../../api/auth/user-auth.api';

@Injectable({ providedIn: 'root' })
export class RefreshAccessService extends RefreshAccessAbstract {
	public refreshToken$: Observable<string> | null = null;

	private readonly authApi = inject(UserAuthApi);

	constructor() {
		super();
	}

	public token(): Observable<string> {
		if (this.refreshToken$) {
			return this.refreshToken$;
		}

		const context = new HttpContext()
			// .set(LOADING_BAR_IGNORED, true)
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
