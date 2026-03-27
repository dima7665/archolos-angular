import { ComponentType } from 'ngx-toastr';

export interface NotifyConfig {
	animationTime?: number;
	delay?: number;
	disableAutoClose?: boolean;
}

export interface NotifyToastType {
	type: InfoType;
}

export type NotifyAllowedType = Exclude<InfoType, 'question'>;
export type NotifyData = string | ComponentType<unknown>;
