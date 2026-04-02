import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ATestService {
	constructor() {
		console.log('ATestService');
	}
}
