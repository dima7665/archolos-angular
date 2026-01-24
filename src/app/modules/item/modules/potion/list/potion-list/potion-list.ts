import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { PotionApi } from '../../api/potion.api';

@Component({
	selector: 'potion-list',
	imports: [],
	templateUrl: './potion-list.html',
	styleUrl: './potion-list.scss',
})
export class PotionList implements OnInit, OnDestroy {
	public readonly items = signal<{id: number; name: string}[]>([]);

	private readonly loadData$ = new Subject<void>();

	constructor(private readonly potionApi: PotionApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap(() => this.potionApi.list())).subscribe((res) => {
			console.log('potions', res);
			this.items.set([]);
		});

    this.loadData$.next();
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
