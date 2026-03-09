import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttpOptions } from '../../interfaces/common-http-options.interface';
import { HttpClientHelper } from '../../helpers/http-client.helper';

@Injectable({ providedIn: 'root' })
export class ApiService {
	private readonly httpClient = inject(HttpClient);

	public get<T>(url: string, options: CommonHttpOptions = {}): Observable<T> {
		// const clearNull = options.context?.get(CLEAR_NULL_PARAMS) ?? true;
		options.params = HttpClientHelper.toHttpParams(options.params);
		// options.context = HttpClientHelper.getDefaultContext(options.context);

		return this.httpClient.get<T>(url, options);
	}

	public post<T>(url: string, body: any, options: CommonHttpOptions = {}): Observable<T> {
		options.params = HttpClientHelper.toHttpParams(options.params);

		return this.httpClient.post<T>(url, body, { withCredentials: true, ...options });
	}

	public patch<T>(url: string, body: any, options: CommonHttpOptions = {}): Observable<T> {
		options.params = HttpClientHelper.toHttpParams(options.params);

		return this.httpClient.patch<T>(url, body, { withCredentials: true, ...options });
	}

	public put<T>(url: string, body: any, options: CommonHttpOptions = {}): Observable<T> {
		options.params = HttpClientHelper.toHttpParams(options.params);

		return this.httpClient.put<T>(url, body, { withCredentials: true, ...options });
	}

	public delete<T>(url: string, options: CommonHttpOptions = {}): Observable<T> {
		options.params = HttpClientHelper.toHttpParams(options.params);

		return this.httpClient.delete<T>(url, { withCredentials: true, ...options });
	}
}
