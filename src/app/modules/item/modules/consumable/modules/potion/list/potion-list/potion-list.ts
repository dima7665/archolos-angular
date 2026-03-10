import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { ConsumableApi } from '../../../../api/consumable.api';
import { ConsumableFilter } from '../../../../interfaces/consumable-filter.interface';
import { ListPayload, PaginationPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { ConsumableType } from '@app/modules/item/enums/item-type.enum';
import { ConsumableItem } from '../../../../interfaces/consumable.interface';
import { FoodTableComponent } from "../../../food/components/food-table/food-table.component";

@Component({
	selector: 'potion-list',
	imports: [FoodTableComponent],
	templateUrl: './potion-list.html',
	styleUrl: './potion-list.scss',
})
export class PotionListComponent implements OnInit, OnDestroy {
	public readonly items = signal<ConsumableItem[]>([]);

	private readonly loadData$ = new Subject<ListPayload<ConsumableFilter>>();

	constructor(private readonly potionApi: ConsumableApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.potionApi.list(filters))).subscribe(({ data }) => {
			this.items.set(data);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: { type: ConsumableType.Potion } });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
