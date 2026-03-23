import { RouterModule, Routes } from '@angular/router';
import { ItemType } from './enums/item-type.enum';
import { NgModule } from '@angular/core';

export const itemRoutes: Routes = [
	{
		path: 'add',
		loadComponent: () => import('./pages/add/item-add.component').then((c) => c.ItemAddComponent),
	},

	{
		path: '',
		loadComponent: () => import('./pages/list/item-list.component').then((c) => c.ItemListComponent),
		children: [
			{
				path: ItemType.Food,
				data: { typeX: ItemType.Food },
				loadComponent: () =>
					import('./modules/consumable/modules/food/pages/food-list/food-list').then(
						(c) => c.FoodListComponent
					),
			},

			{
				path: ItemType.Potion,
				data: { typeX: ItemType.Potion },
				loadComponent: () =>
					import('./modules/consumable/modules/potion/pages/potion-list/potion-list').then(
						(c) => c.PotionListComponent
					),
			},

			{
				path: ItemType.Other,
				data: { typeX: ItemType.Other },
				loadComponent: () =>
					import('./modules/misc/pages/list/misc-list.component').then(
						(c) => c.MiscListComponent
					),
			},

			{ path: '**', redirectTo: 'food' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(itemRoutes)],
	exports: [RouterModule],
})
export class ItemModule {}
