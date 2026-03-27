import { EnvironmentProviders, Provider } from '@angular/core';
import { provideToastr } from 'ngx-toastr';

import { NotifyService } from './services/notify.service';

import { defaultNotifyConfig, NOTIFY_CONFIG_TOKEN, NotifyGlobalConfig } from './tokens/notify.token';

export const notifyProvider = (config: Partial<NotifyGlobalConfig> = {}): Array<EnvironmentProviders | Provider> => {
	const newConfig = { ...defaultNotifyConfig, ...config };
	return [{ provide: NOTIFY_CONFIG_TOKEN, useValue: newConfig }, provideToastr(newConfig), NotifyService];
};
