import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { FoodApi } from '../../api/food.api';
import { FoodItem } from '../../interfaces/food.interface';
import { FoodTable } from "../components/food-table/food-table.component";

@Component({
	selector: 'food-list',
	imports: [FoodTable],
	templateUrl: './food-list.html',
	styleUrl: './food-list.scss',
  host: {class: 'd-block'},
})
export class FoodList implements OnInit, OnDestroy {
	public readonly items = signal<FoodItem[]>([]);

	private readonly loadData$ = new Subject<void>();

	constructor(private readonly foodApi: FoodApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap(() => this.foodApi.list())).subscribe(data => {
			this.items.set(data)
		});

    this.loadData$.next();
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
