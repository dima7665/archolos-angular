import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptors } from './core/http/interceptors';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withInterceptors(interceptors)),
		provideToastr(),
	],
};
