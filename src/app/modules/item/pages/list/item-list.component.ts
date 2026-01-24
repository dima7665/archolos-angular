import { Component, signal } from '@angular/core';
import { MatFormField, MatSelect, MatLabel, MatOption } from '@angular/material/select';
import { FoodList } from "../../modules/food/list/food-list/food-list";
import { PotionList } from "../../modules/potion/list/potion-list/potion-list";

const itemOptions = [
	{ key: 'food', text: 'Food' },
	{ key: 'potion', text: 'Potions' },
	{ key: 'recipe', text: 'Recipes' },
	{ key: 'weapon', text: 'Weapons' },
	{ key: 'armor', text: 'Armors' },
	{ key: 'jewelry', text: 'Jewelry' },
	{ key: 'scroll', text: 'Scrolls' },
	{ key: 'misc', text: 'Other' },
];

@Component({
	selector: 'item-list',
	templateUrl: './item-list.component.html',
	imports: [MatSelect, MatFormField, MatLabel, MatOption, FoodList, PotionList],
})
export class ItemListComponent {
	public readonly options = itemOptions;

	public readonly selectedType = signal(this.options[0].key);

}
