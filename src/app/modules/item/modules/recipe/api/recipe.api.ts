import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/modules/api/api.service';
import { firstValueFrom, map, Observable } from 'rxjs';
import { ListObj, ListPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { RecipeCreateData, RecipeItem } from '../interfaces/recipe.interface';
import { RecipeFilter } from '../interfaces/recipe-filter.interface';
import { RecipeIngredientsSelectList, RecipeIngredientsSelectListRaw } from '../interfaces/recipe-ingredient.interface';
import { SelectOptionHelper } from '@app/modules/shared/form/helpers/select-option/select-option.helper';

@Injectable({ providedIn: 'root' })
export class RecipeApi {
	constructor(private readonly apiService: ApiService) {}

	public list(payload: ListPayload<RecipeFilter>): Observable<ListObj<RecipeItem>> {
		return this.apiService.get('/recipe', { params: payload });
	}

	public add(data: RecipeCreateData): Promise<RecipeItem> {
		return firstValueFrom(this.apiService.post('/recipe', data));
	}

	public selectIngredients(payload: RecipeFilter = {}): Observable<RecipeIngredientsSelectList> {
		//
		// TODO: cache
		//
		return this.apiService
			.get<RecipeIngredientsSelectListRaw>('/recipe/ingredients/select', { params: payload })
			.pipe(
				map(({ misc, weapons, consumables }) => ({
					misc: SelectOptionHelper.toOptions(misc),
					weapons: SelectOptionHelper.toOptions(weapons),
					consumables: SelectOptionHelper.toOptions(consumables),
				}))
			);
	}
}
