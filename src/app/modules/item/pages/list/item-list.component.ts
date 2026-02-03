import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatFormField, MatSelect, MatLabel, MatOption } from '@angular/material/select';
import { itemTypeOptions } from '../../constants/item-option';

@Component({
	selector: 'item-list',
	templateUrl: './item-list.component.html',
	styleUrl: './item-list.component.scss',
	imports: [MatSelect, MatFormField, MatLabel, MatOption, RouterOutlet],
})
export class ItemListComponent {
	public readonly options = itemTypeOptions;

	public readonly selectedType = signal(this.options[0].key);

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {
		effect(() => {
			this.router.navigate([this.selectedType()], { relativeTo: this.route });
		});
	}
}
