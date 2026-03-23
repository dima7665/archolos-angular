import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { FoodTableComponent } from '../../components/food-table/food-table.component';
import {
	ListPayload,
	Pagination,
	PaginationEvent,
	PaginationPayload,
} from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { ConsumableFilter } from '../../../../interfaces/consumable-filter.interface';
import { ConsumableItem } from '../../../../interfaces/consumable.interface';
import { ConsumableApi } from '../../../../api/consumable.api';
import { ConsumableType } from '@app/modules/item/enums/item-type.enum';
import { PaginationComponent } from '@app/modules/shared/pagination/components/pagination/pagination.component';

@Component({
	selector: 'food-list',
	templateUrl: './food-list.html',
	styleUrl: './food-list.scss',
	host: { class: 'd-block' },
	imports: [FoodTableComponent, PaginationComponent],
})
export class FoodListComponent implements OnInit, OnDestroy {
	public readonly items = signal<ConsumableItem[]>([]);
	public readonly pagination = signal<Nullable<Pagination>>(null);

	private readonly loadData$ = new Subject<ListPayload<ConsumableFilter>>();

	constructor(private readonly foodApi: ConsumableApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.foodApi.list(filters))).subscribe(({ data, pagination }) => {
			this.items.set(data);
			this.pagination.set(pagination);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: { type: ConsumableType.Food } });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}

	public onPageChange(data: PaginationEvent): void {
		this.loadData$.next({
			pagination: new PaginationPayload({ page: data.currentPage, perPage: data.perPage }),
			filter: { type: ConsumableType.Food },
		});
	}
}
