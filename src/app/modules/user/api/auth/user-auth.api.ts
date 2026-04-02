import { Injectable } from '@angular/core';
import { CommonHttpOptions } from '@app/core/http/interfaces/common-http-options.interface';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { Tokens, User } from '../../interfaces/user.interface';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthApiConfig } from '../../services/refresh-access/refresh-access.abstract';

interface LoginResponse {
	user: User;
	tokens: Tokens;
}

@Injectable({ providedIn: 'root' })
export class UserAuthApi {
	constructor(private readonly apiService: ApiService) {}

	public login(body: unknown, options?: CommonHttpOptions): Promise<LoginResponse> {
		return firstValueFrom(
			this.apiService.post<LoginResponse>('/auth/login', body, { withCredentials: false, ...options })
		);
	}

	public logout(token: string, options?: CommonHttpOptions): Promise<User> {
		return firstValueFrom(this.apiService.delete<User>('/auth/logout', { params: { token }, ...options }));
	}

	public create(body: unknown, options?: CommonHttpOptions): Promise<User> {
		return firstValueFrom(this.apiService.post<User>('/auth/create', body, options));
	}

	public refreshToken(body: unknown, options?: CommonHttpOptions): Promise<Tokens> {
		return firstValueFrom(
			this.apiService.post<Tokens>(AuthApiConfig.TOKEN, body, { ...options, withCredentials: false })
		);
	}

	public getCurrentUser(): Observable<User> {
		return this.apiService.get<User>('/user/get', { withCredentials: true });
	}

	public test(options?: CommonHttpOptions): Observable<User> {
		return this.apiService.get<User>('/users/me', options);
	}
}
