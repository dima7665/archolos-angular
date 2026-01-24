import { HttpContextToken } from "@angular/common/http";

export const WITH_EXTERNAL_URL = new HttpContextToken<boolean>(() => true);;