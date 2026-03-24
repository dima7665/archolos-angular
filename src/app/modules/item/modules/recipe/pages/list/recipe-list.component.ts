import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RecipeTableComponent } from '../../components/recipe-table/recipe-table.component';
import { RecipeItem } from '../../interfaces/recipe.interface';
import { Subject, switchMap } from 'rxjs';
import { ListPayload, PaginationPayload } from '@app/modules/shared/pagination/interfaces/pagination.interface';
import { RecipeFilter } from '../../interfaces/recipe-filter.interface';
import { RecipeApi } from '../../api/recipe.api';

@Component({
	selector: 'recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrl: './recipe-list.component.scss',
	imports: [RecipeTableComponent],
})
export class RecipeListComponent implements OnInit, OnDestroy {
	public readonly items = signal<RecipeItem[]>([]);

	private readonly loadData$ = new Subject<ListPayload<RecipeFilter>>();

	constructor(private readonly recipeApi: RecipeApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap((filters) => this.recipeApi.list(filters))).subscribe(({ data }) => {
			this.items.set(data);
		});

		this.loadData$.next({ pagination: new PaginationPayload(), filter: {} });
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
