import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { FoodApi } from '../../api/food.api';

@Component({
	selector: 'food-list',
	imports: [],
	templateUrl: './food-list.html',
	styleUrl: './food-list.scss',
  host: {class: 'd-block'},
})
export class FoodList implements OnInit, OnDestroy {
	private readonly type = 'food';

	private readonly loadData$ = new Subject<void>();

	constructor(private readonly foodApi: FoodApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap(() => this.foodApi.list())).subscribe((res) => {
			console.log('food', res);
		});

    this.loadData$.next();
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
