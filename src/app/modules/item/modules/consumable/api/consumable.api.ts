import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ConsumableCreateData, ConsumableItem } from '../interfaces/consumable.interface';
import { ListObj, ListPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { ConsumableFilter } from '../interfaces/consumable-filter.interface';

@Injectable({ providedIn: 'root' })
export class ConsumableApi {
	constructor(private readonly apiService: ApiService) {}

	public list(payload: ListPayload<ConsumableFilter>): Observable<ListObj<ConsumableItem>> {
		return this.apiService.get('/consumable', { params: payload });
	}

	public add(data: ConsumableCreateData): Promise<ConsumableItem> {
		return firstValueFrom(this.apiService.post('/consumable', data));
	}
}
