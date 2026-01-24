import { HttpContext, HttpHeaders } from '@angular/common/http';

export interface CommonHttpOptions extends BaseHttpOptions {
    observe?: 'body';
}

export interface ResponseHttpOptions extends BaseHttpOptions {
    observe: 'response';
}

export interface BaseHttpOptions {
    context?: HttpContext;

    headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
    };

    params?: any;
    responseType?: 'json';
    withCredentials?: boolean;
}
