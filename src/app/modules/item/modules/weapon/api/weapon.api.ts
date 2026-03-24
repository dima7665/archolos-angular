import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListObj, ListPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { WeaponCreateData, WeaponItem } from '../interfaces/weapon.interface';
import { WeaponFilter } from '../interfaces/weapon-filter.interface';

@Injectable({ providedIn: 'root' })
export class WeaponApi {
	constructor(private readonly apiService: ApiService) {}

	public list(payload: ListPayload<WeaponFilter>): Observable<ListObj<WeaponItem>> {
		return this.apiService.get('/weapon', { params: payload });
	}

	public add(data: WeaponCreateData): Promise<WeaponItem> {
		return firstValueFrom(this.apiService.post('/weapon', data));
	}
}
