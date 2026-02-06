import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/http/modules/api/api.service';
import { firstValueFrom, Observable } from 'rxjs';
import { FoodCreateData, FoodItem } from '../interfaces/food.interface';

@Injectable({ providedIn: 'root' })
export class FoodApi {
	constructor(private readonly apiService: ApiService) {}

	public list(): Observable<FoodItem[]> {
		return this.apiService.get('/consumable', { params: { type: 'food' } });
	}

	public add(data: FoodCreateData): Promise<FoodItem> {
		return firstValueFrom(this.apiService.post('/consumable/add', data));
	}
}
