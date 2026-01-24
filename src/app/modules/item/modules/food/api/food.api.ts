import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/http/modules/api/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoodApi {
	constructor(private readonly apiService: ApiService) {}

	public list(): Observable<any[]> {
		return this.apiService.get('/consumable', { params: { type: 'food' } });
	}
}
