import { inject, Injectable, InjectionToken } from "@angular/core";

export interface AppConfig {
    external_api_url: string;
    app_env: Env;
}

export enum Env {
	Local = 'local',
	Pipeline = 'pipeline',
	Production = 'production',
}

export const APP_CONFIG = new InjectionToken<AppConfig>('Api config');

@Injectable({providedIn: 'root'})
export class AppConfigService {
    // private readonly APP_CONFIG = inject(APP_CONFIG);

    public get externalApiUrl(): string {
		return 'http://localhost:5080/api';
		// return this.APP_CONFIG.external_api_url;
	}

    // public get appEnv(): Env {
	// 	return this.APP_CONFIG.app_env;
	// }
}