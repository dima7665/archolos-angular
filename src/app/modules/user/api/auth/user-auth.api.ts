import { Injectable } from '@angular/core';
import { CommonHttpOptions } from '@app/core/http/interfaces/common-http-options.interface';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { Tokens, User } from '../../interfaces/user.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserAuthApi {
	constructor(private readonly apiService: ApiService) {}

	public login(body: unknown, options?: CommonHttpOptions): Promise<User & Tokens> {
		return firstValueFrom(this.apiService.post<User & Tokens>('/auth/signin', body, options));
	}

    public logout(options?: CommonHttpOptions): Promise<User> {
		return firstValueFrom(this.apiService.delete<User>('/auth/signout', options));
	}

    public create(body: unknown, options?: CommonHttpOptions): Promise<User> {
		return firstValueFrom(this.apiService.post<User>('/auth/create', body, options));
	}

    public test(options?: CommonHttpOptions): Promise<User> {
		return firstValueFrom(this.apiService.get<User>('/users/me', options));
	}
}
