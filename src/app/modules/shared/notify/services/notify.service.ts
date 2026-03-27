import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotifyService {
	private readonly toastrService = inject(ToastrService);

    private readonly timeOut = 3000;

	public success(message?: string, title?: string): void {
		this.toastrService.success(message || 'Success message', title, { timeOut: this.timeOut });
	}

	public error(message?: string, title?: string): void {
		this.toastrService.error(message || 'Error message', title, { timeOut: this.timeOut });
	}

	public warning(message?: string, title?: string): void {
		this.toastrService.warning(message || 'Warning message', title, { timeOut: this.timeOut });
	}

	public info(message?: string, title?: string): void {
		this.toastrService.info(message || 'Info message', title, { timeOut: this.timeOut });
	}
}
