import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { WITH_EXTERNAL_URL } from "./api.token";
import { inject } from "@angular/core";
import { AppConfigService } from "../../../app-config/app-config.service";

export const apiInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const withExternalUrl = request.context.get(WITH_EXTERNAL_URL);
    const appConfigService = inject(AppConfigService);

    if (!withExternalUrl) {
		return next(request);
	}

	const url = `${appConfigService.externalApiUrl}${request.url}`;

	return next(request.clone({ url }));
}