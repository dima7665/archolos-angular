import { InjectionToken, Type } from '@angular/core';

export interface NotifyGlobalConfig {
	timeOut: number;
	preventDuplicates: boolean;
	onActivateTick: boolean;
	// toastComponent: Type<unknown>;
	easeTime: number;
	tapToDismiss: boolean;

	// positionClass: string;
}

export const defaultNotifyConfig: NotifyGlobalConfig = {
	timeOut: 6000,
	preventDuplicates: true,
	onActivateTick: true,
	// toastComponent: NotifyComponent,
	easeTime: 300,
	tapToDismiss: false,
	// positionClass: 'l-notify',
};

export const NOTIFY_CONFIG_TOKEN = new InjectionToken<NotifyGlobalConfig>('NOTIFY_CONFIG_TOKEN', {
	providedIn: 'root',
	factory: () => defaultNotifyConfig,
});
