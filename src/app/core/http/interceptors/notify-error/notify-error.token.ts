import { HttpContextToken } from '@angular/common/http';

export const IGNORE_NOTIFY_ERROR = new HttpContextToken<boolean>(() => false);
