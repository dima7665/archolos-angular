import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { WeaponTableComponent } from '../../components/weapon-table/weapon-table.component';
import { Subject, switchMap } from 'rxjs';
import { WeaponApi } from '../../api/weapon.api';
import { ListPayload, PaginationPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { WeaponFilter } from '../../interfaces/weapon-filter.interface';
import { WeaponItem } from '../../interfaces/weapon.interface';

@Component({
	selector: 'app-weapon-list',
	templateUrl: './weapon-list.component.html',
	styleUrl: './weapon-list.component.scss',
	imports: [WeaponTableComponent],
})
export class WeaponListComponent implements OnInit, OnDestroy {
	public readonly items = signal<WeaponItem[]>([]);

	private readonly loadData$ = new Subject<ListPayload<WeaponFilter>>();

	constructor(private readonly weaponApi: WeaponApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.weaponApi.list(filters))).subscribe(({ data }) => {
			this.items.set(data);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: {} });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
