import { HttpStatusCode } from '@angular/common/http';

export const ignoredErrorStatuses = [
	HttpStatusCode.Unauthorized,
	HttpStatusCode.MethodNotAllowed,
	HttpStatusCode.TooManyRequests,
	HttpStatusCode.MisdirectedRequest,
];

export class NotifyErrorHelper {
	public static isIgnoredStatus(status: Nullable<number>): boolean {
		return ignoredErrorStatuses.includes(status!);
	}
}