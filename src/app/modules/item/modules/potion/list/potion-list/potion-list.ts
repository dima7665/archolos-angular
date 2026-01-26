import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { PotionApi } from '../../api/potion.api';
import { PotionItem } from '../../interfaces/potion.interface';
import { PotionTable } from "../../components/potion-table/potion-table.component";

@Component({
	selector: 'potion-list',
	imports: [PotionTable],
	templateUrl: './potion-list.html',
	styleUrl: './potion-list.scss',
})
export class PotionList implements OnInit, OnDestroy {
	public readonly items = signal<PotionItem[]>([]);

	private readonly loadData$ = new Subject<void>();

	constructor(private readonly potionApi: PotionApi) {}

	public ngOnInit(): void {
		this.loadData$.pipe(switchMap(() => this.potionApi.list())).subscribe(data => {
			this.items.set(data);
		});

    this.loadData$.next();
	}

	public ngOnDestroy(): void {
		this.loadData$.unsubscribe();
	}
}
