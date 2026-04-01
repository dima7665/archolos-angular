import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Item, ItemFilter } from '@app/modules/item/interfaces/item.interface';
import {
	ListPayload,
	Pagination,
	PaginationEvent,
	PaginationPayload,
} from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { Subject, switchMap } from 'rxjs';
import { MiscApi } from '../../api/misc.api';
import { MiscTableComponent } from '../../components/misc-table/misc-table.component';
import { PaginationComponent } from '@app/modules/shared/pagination/components/pagination/pagination.component';

@Component({
	selector: 'misc-list',
	templateUrl: './misc-list.component.html',
	styleUrl: './misc-list.component.scss',
	imports: [MiscTableComponent, PaginationComponent],
})
export class MiscListComponent implements OnInit, OnDestroy {
	public readonly items = signal<Item[]>([]);
	public readonly pagination = signal<Nullable<Pagination>>(null);

	private readonly loadData$ = new Subject<ListPayload<ItemFilter>>();

	constructor(private readonly miscApi: MiscApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.miscApi.list(filters))).subscribe(({ data, pagination }) => {
			this.items.set(data);
			this.pagination.set(pagination);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: {} });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}

	public onPageChange(data: PaginationEvent): void {
		this.loadData$.next({
			pagination: new PaginationPayload({ page: data.currentPage, perPage: data.perPage }),
			filter: {},
		});
	}
}
