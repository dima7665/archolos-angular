import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotifyService } from '@app/modules/shared/notify/services/notify.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IGNORE_NOTIFY_ERROR } from './notify-error.token';
import { NotifyErrorHelper } from './notify-error.helper';

const isNotify = (request: HttpRequest<unknown>, e: HttpErrorResponse): boolean => {
	const isAllowedContext = !request.context.get(IGNORE_NOTIFY_ERROR);
	const isAllowedStatus = !NotifyErrorHelper.isIgnoredStatus(e.status);

	return isAllowedStatus && isAllowedContext;
};

export const notifyErrorInterceptor = (
	request: HttpRequest<unknown>,
	next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
	const notifyService = inject(NotifyService);

	return next(request).pipe(
		catchError((e: HttpErrorResponse) => {
			if (isNotify(request, e) && e.error?.message) {
				notifyService.error(e.error.message);
			}

			return throwError(() => e);
		})
	);
};
