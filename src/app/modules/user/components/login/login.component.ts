import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserAuthApi } from '../../api/auth/user-auth.api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypedForm } from '@app/modules/shared/form/interfaces/typed-form.interface';

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

	constructor(private readonly loginApi: UserAuthApi) {}

	public async login(): Promise<void> {
		await this.userService.login(this.loginFormGroup.value as LoginForm);
	}

	public async logout(): Promise<void> {
		const res = await this.userService.logout();
	}

	public async test(): Promise<void> {
		const res = await this.loginApi.test({ withCredentials: true });
	}
}
