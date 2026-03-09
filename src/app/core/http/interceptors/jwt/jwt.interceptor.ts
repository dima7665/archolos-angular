import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '@app/modules/user/services/user.service';

export const jwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
	const userService = inject(UserService);

	if (request.withCredentials && userService.accessToken()) {
		const jwtHeader = { Authorization: `Bearer ${userService.accessToken()}` };

		request = request.clone({ setHeaders: jwtHeader });
	}

	return next(request);
};
