import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/http/modules/api/api.service';
import { Observable } from 'rxjs';
import { PotionItem } from '../interfaces/potion.interface';

@Injectable({ providedIn: 'root' })
export class PotionApi {
	constructor(private readonly apiService: ApiService) {}

	public list(): Observable<PotionItem[]> {
		return this.apiService.get('/consumable', { params: { type: 'potion' } });
	}
}