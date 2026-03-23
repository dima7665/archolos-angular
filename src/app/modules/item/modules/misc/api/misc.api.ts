import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListObj, ListPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { Item, ItemCreateData, ItemFilter } from '@app/modules/item/interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class MiscApi {
	constructor(private readonly apiService: ApiService) {}

	public list(payload: ListPayload<ItemFilter>): Observable<ListObj<Item>> {
		return this.apiService.get('/misc', { params: payload });
	}

	public add(data: ItemCreateData): Promise<Item> {
		return firstValueFrom(this.apiService.post('/misc', data));
	}
}
