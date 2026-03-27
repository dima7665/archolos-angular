import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
	HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationTokenService } from '@app/modules/user/services/auth-token/auth-token.service';
import { RefreshAccessService } from '@app/modules/user/services/refresh-access/refresh-access.service';
import { UserService } from '@app/modules/user/services/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { IS_TOKEN_REQUEST } from '../../tokens/is-token-request.token';
import { WorkerTokenError } from '@app/core/worker/errors/worker.error';
import { WorkerHelper } from '@app/core/worker/helpers/worker.helper';

export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
	if (!request.withCredentials) {
		return next(request);
	}

	const userService = inject(UserService);
	const authenticationTokenService = inject(AuthenticationTokenService);
	const refreshAccessService = inject(RefreshAccessService);

	// const jwtToken = request.context.get(JWT_TOKEN);
	const isTokenRequest = request.context.get(IS_TOKEN_REQUEST);
	const isAccessToken = authenticationTokenService.accessToken;

	if (!isAccessToken) {
		return next(request).pipe(
			catchError((e: HttpErrorResponse) => {
				if (e.status === HttpStatusCode.Unauthorized) {
					refreshAccessService.catchErrorToken(request?.url);
				}

				return throwError(() => e);
			})
		);
	}

	if (request.withCredentials) {
		const jwtHeader = { Authorization: `Bearer ${userService.accessToken()}` };

		request = request.clone({ setHeaders: jwtHeader });
	}

	// Avoid token request
	if (
		!isTokenRequest &&
		(authenticationTokenService.isAccessTokenExpiringSoon() || refreshAccessService.refreshToken$)
	) {
		return addToQueue(refreshAccessService, request, next);
	}

	return next(request).pipe(
		catchError((e: HttpErrorResponse) => {
			// Avoid Infinite Loops
			if (!isTokenRequest && e.status === HttpStatusCode.Unauthorized) {
				return addToQueue(refreshAccessService, request, next);
			}

			return throwError(() => e);
		})
	);

	//
	//
	//

	// if (request.withCredentials && userService.accessToken()) {
	// 	const jwtHeader = { Authorization: `Bearer ${userService.accessToken()}` };

	// 	request = request.clone({ setHeaders: jwtHeader });
	// }

	// return next(request);
};

export const addToQueue = (
	refreshAccessService: RefreshAccessService,
	request: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> =>
	refreshAccessService.token().pipe(
		switchMap((newToken) => next(addToken(request, newToken))),
		catchError(handleTokenError(refreshAccessService, request))
	);

const handleTokenError =
	(refreshAccessService: RefreshAccessService, request: HttpRequest<unknown>) =>
	(error: HttpErrorResponse | WorkerTokenError): Observable<never> => {
		const isWorkerError = error instanceof WorkerTokenError;
		const httpError = error instanceof HttpErrorResponse ? error : null;

		const isUnauthorized =
			httpError?.status === HttpStatusCode.Unauthorized || httpError?.status === HttpStatusCode.BadRequest;
		const isSharedWorkerSupported = WorkerHelper.isSharedWorkerSupported();

		const shouldCatch = isWorkerError || (!!httpError && isUnauthorized && !isSharedWorkerSupported);

		if (shouldCatch) {
			refreshAccessService.catchErrorToken(request?.url);
		}

		return throwError(() => error);
	};

export const addToken = (req: HttpRequest<unknown>, accessToken: Nullable<string>): HttpRequest<unknown> => {
	return req.clone({
		setHeaders: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
