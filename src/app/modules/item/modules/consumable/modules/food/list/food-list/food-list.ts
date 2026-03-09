import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { FoodTableComponent } from '../../components/food-table/food-table.component';
import { ListPayload, PaginationPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { ConsumableFilter } from '../../../../interfaces/consumable-filter.interface';
import { ConsumableItem } from '../../../../interfaces/consumable.interface';
import { ConsumableApi } from '../../../../api/consumable.api';
import { ConsumableType } from '@app/modules/item/enums/item-type.enum';

@Component({
	selector: 'food-list',
	imports: [FoodTableComponent],
	templateUrl: './food-list.html',
	styleUrl: './food-list.scss',
	host: { class: 'd-block' },
})
export class FoodListComponent implements OnInit, OnDestroy {
	public readonly items = signal<ConsumableItem[]>([]);

	private readonly loadData$ = new Subject<ListPayload<ConsumableFilter>>();

	constructor(private readonly foodApi: ConsumableApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.foodApi.list(filters))).subscribe(({ data }) => {
			this.items.set(data);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: { type: ConsumableType.Food } });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
