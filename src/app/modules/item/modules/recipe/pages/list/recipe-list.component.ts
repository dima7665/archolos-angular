import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RecipeTableComponent } from '../../components/recipe-table/recipe-table.component';
import { RecipeItem } from '../../interfaces/recipe.interface';
import { Subject, switchMap } from 'rxjs';
import {
	ListPayload,
	Pagination,
	PaginationEvent,
	PaginationPayload,
} from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { RecipeFilter } from '../../interfaces/recipe-filter.interface';
import { RecipeApi } from '../../api/recipe.api';
import { PaginationComponent } from '@app/modules/shared/pagination/components/pagination/pagination.component';

@Component({
	selector: 'recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrl: './recipe-list.component.scss',
	imports: [RecipeTableComponent, PaginationComponent],
})
export class RecipeListComponent implements OnInit, OnDestroy {
	public readonly items = signal<RecipeItem[]>([]);
	public readonly pagination = signal<Nullable<Pagination>>(null);

	private readonly loadData$ = new Subject<ListPayload<RecipeFilter>>();

	constructor(private readonly recipeApi: RecipeApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.recipeApi.list(filters))).subscribe(({ data, pagination }) => {
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
