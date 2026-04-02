import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptors } from './core/http/interceptors';
import { provideToastr } from 'ngx-toastr';
// import { TokenWorkerService } from './core/worker/modules/token/token-worker.service';
// import { WorkerHelper } from './core/worker/helpers/worker.helper';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withInterceptors(interceptors)),
		provideToastr(),
		// provideAppInitializer(() => initializeApp()),
	],
};

// async function initializeApp(): Promise<void> {
// 	const tokenWorkerService = inject(TokenWorkerService);

// 	if (WorkerHelper.isSharedWorkerSupported()) {
// 		try {
// 			console.log('worker supported, await');
// 			await Promise.all([tokenWorkerService.init()]);
// 		} catch (error) {
// 			console.error('Failed to create SharedWorker:', error);
// 		}
// 	}
// }
