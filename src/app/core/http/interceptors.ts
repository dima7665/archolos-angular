import { jwtInterceptor } from "./interceptors/jwt/jwt.interceptor";
import { apiInterceptor } from "./modules/api/api.interceptor";

export const interceptors = [apiInterceptor, jwtInterceptor];