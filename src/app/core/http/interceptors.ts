import { authInterceptor } from "./interceptors/auth/auth.interceptor";
import { jwtInterceptor } from "./interceptors/jwt/jwt.interceptor";
import { notifyErrorInterceptor } from "./interceptors/notify-error/notify-error.interceptor";
import { apiInterceptor } from "./modules/api/api.interceptor";

export const interceptors = [apiInterceptor, authInterceptor, jwtInterceptor, notifyErrorInterceptor];