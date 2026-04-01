import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { WeaponTableComponent } from '../../components/weapon-table/weapon-table.component';
import { Subject, switchMap } from 'rxjs';
import { WeaponApi } from '../../api/weapon.api';
import {
	ListPayload,
	Pagination,
	PaginationEvent,
	PaginationPayload,
} from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { WeaponFilter } from '../../interfaces/weapon-filter.interface';
import { WeaponItem } from '../../interfaces/weapon.interface';
import { PaginationComponent } from '@app/modules/shared/pagination/components/pagination/pagination.component';

@Component({
	selector: 'app-weapon-list',
	templateUrl: './weapon-list.component.html',
	styleUrl: './weapon-list.component.scss',
	imports: [WeaponTableComponent, PaginationComponent],
})
export class WeaponListComponent implements OnInit, OnDestroy {
	public readonly items = signal<WeaponItem[]>([]);
	public readonly pagination = signal<Nullable<Pagination>>(null);

	private readonly loadData$ = new Subject<ListPayload<WeaponFilter>>();

	constructor(private readonly weaponApi: WeaponApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.weaponApi.list(filters))).subscribe(({ data, pagination }) => {
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
