import { Component, signal } from '@angular/core';
import { Item, ItemFilter } from '@app/modules/item/interfaces/item.interface';
import { ListPayload, PaginationPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { Subject, switchMap } from 'rxjs';
import { MiscApi } from '../../api/misc.api';
import { MiscTableComponent } from '../../components/misc-table/misc-table.component';

@Component({
	selector: 'misc-list',
	templateUrl: './misc-list.component.html',
	styleUrl: './misc-list.component.scss',
	imports: [MiscTableComponent],
})
export class MiscListComponent {
	public readonly items = signal<Item[]>([]);

	private readonly loadData$ = new Subject<ListPayload<ItemFilter>>();

	constructor(private readonly miscApi: MiscApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.miscApi.list(filters))).subscribe(({ data }) => {
			this.items.set(data);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: {} });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
