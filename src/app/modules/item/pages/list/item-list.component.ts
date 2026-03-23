import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatFormField, MatSelect, MatLabel, MatOption } from '@angular/material/select';
import { itemTypeOptions } from '../../constants/item-option';
import { ItemType } from '../../enums/item-type.enum';

@Component({
	selector: 'item-list',
	templateUrl: './item-list.component.html',
	styleUrl: './item-list.component.scss',
	imports: [MatSelect, MatFormField, MatLabel, MatOption, RouterOutlet, RouterLink],
})
export class ItemListComponent {
	public readonly options = itemTypeOptions;

	public readonly selectedType = signal(this.options[0].key);

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {
		const type = this.router.url.split('?')[0].split('/').pop(); // get type from url
			
		if (type) {
			this.selectedType.set(type as ItemType);
		}

		effect(() => {
			this.router.navigate([this.selectedType()], { relativeTo: this.route });
		});
	}
}
