import { inject } from "@angular/core";
import { IGNORE_NOTIFY_ERROR } from "../notify-error/notify-error.token";
import { NotifyService } from "@app/modules/shared/notify/services/notify.service";
import { HttpEvent, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
	const notifyService = inject(NotifyService);

	return next(request).pipe(
		catchError(e => {
            const isNotifyAllowed = !request.context.get(IGNORE_NOTIFY_ERROR);

			// Throttling interceptor
			if (e.status === HttpStatusCode.TooManyRequests) {
				notifyService.error($localize`Too many requests. Try again later`);
			}

			// Unauthorized
			if (e.status === HttpStatusCode.Unauthorized && isNotifyAllowed) {
				notifyService.error(e.error?.message || $localize`Unathorized`);
			}

			return throwError(() => e);
		})
	);
};
