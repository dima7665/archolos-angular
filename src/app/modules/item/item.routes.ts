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
				loadComponent: () => import('./modules/consumable/modules/food/list/food-list/food-list').then((c) => c.FoodListComponent),
			},

			{
				path: ItemType.Potion,
				loadComponent: () =>
					import('./modules/consumable/modules/potion/list/potion-list/potion-list').then((c) => c.PotionListComponent),
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
