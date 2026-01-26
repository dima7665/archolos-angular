import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/http/modules/api/api.service';
import { Observable } from 'rxjs';
import { FoodItem } from '../interfaces/food.interface';

@Injectable({ providedIn: 'root' })
export class FoodApi {
	constructor(private readonly apiService: ApiService) {}

	public list(): Observable<FoodItem[]> {
		return this.apiService.get('/consumable', { params: { type: 'food' } });
	}
}
