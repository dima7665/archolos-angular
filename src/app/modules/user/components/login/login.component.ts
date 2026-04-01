import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserAuthApi } from '../../api/auth/user-auth.api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';
import { AuthenticationTokenService } from '../../services/auth-token/auth-token.service';
import { delay, of, switchMap, take } from 'rxjs';

interface LoginForm {
	email: string;
	password: string;
}

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
	imports: [ReactiveFormsModule],
})
export class LoginComponent {
	private readonly userService = inject(UserService);

	public readonly user = this.userService.user;

	public readonly loginFormGroup = new FormGroup<TypedForm<LoginForm>>({
		email: new FormControl('', { nonNullable: true }),
		password: new FormControl('', { nonNullable: true }),
	});

	constructor(
		private readonly loginApi: UserAuthApi,
		private localStorageService: AuthenticationTokenService
	) {}

	public ngOnInit(): void {
		if (this.user()) return;

		of([1])
			.pipe(
				delay(10), // wait for tokens loading from localStorage
				switchMap(() => this.loginApi.getCurrentUser()),
				take(1)
			)
			.subscribe((user) => {
				user && this.userService.setUser(user);
			});
	}

	public async login(): Promise<void> {
		await this.userService.login(this.loginFormGroup.value as LoginForm);
	}

	public async logout(): Promise<void> {
		const res = await this.userService.logout();
	}

	public async test(): Promise<void> {
		// console.log(this.localStorageService.isAccessTokenExpiringSoon());
		console.log('test: ');
	}
}
