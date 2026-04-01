import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { ConsumableApi } from '../../../../api/consumable.api';
import { ConsumableFilter } from '../../../../interfaces/consumable-filter.interface';
import {
	ListPayload,
	Pagination,
	PaginationEvent,
	PaginationPayload,
} from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { ConsumableType } from '@app/modules/item/enums/item-type.enum';
import { ConsumableItem } from '../../../../interfaces/consumable.interface';
import { FoodTableComponent } from '../../../food/components/food-table/food-table.component';
import { PaginationComponent } from '@app/modules/shared/pagination/components/pagination/pagination.component';

@Component({
	selector: 'potion-list',
	templateUrl: './potion-list.html',
	styleUrl: './potion-list.scss',
	imports: [FoodTableComponent, PaginationComponent],
})
export class PotionListComponent implements OnInit, OnDestroy {
	public readonly items = signal<ConsumableItem[]>([]);
	public readonly pagination = signal<Nullable<Pagination>>(null);

	private readonly loadData$ = new Subject<ListPayload<ConsumableFilter>>();

	constructor(private readonly potionApi: ConsumableApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.potionApi.list(filters))).subscribe(({ data, pagination }) => {
			this.items.set(data);
			this.pagination.set(pagination);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: { type: ConsumableType.Potion } });
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
