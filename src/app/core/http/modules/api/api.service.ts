import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttpOptions } from '../../interfaces/common-http-options.interface';

const baseUrl = 'http://localhost:3333';

@Injectable({ providedIn: 'root' })
export class ApiService {
	private readonly httpClient = inject(HttpClient);

	public get<T>(url: string, options: CommonHttpOptions = {}): Observable<T> {
		return this.httpClient.get<T>(url, options);
	}

	public post<T>(url: string, body: any, options: CommonHttpOptions = {}): Observable<T> {
		return this.httpClient.post<T>(url, body, { withCredentials: true, ...options });
	}

	public patch<T>(url: string, body: any, options: CommonHttpOptions = {}): Observable<T> {
		return this.httpClient.patch<T>(url, body, { withCredentials: true, ...options });
	}

	public put<T>(url: string, body: any, options: CommonHttpOptions = {}): Observable<T> {
		return this.httpClient.put<T>(url, body, { withCredentials: true, ...options });
	}

	public delete<T>(url: string, options: CommonHttpOptions = {}): Observable<T> {
		return this.httpClient.delete<T>(url, { withCredentials: true, ...options });
	}
}
