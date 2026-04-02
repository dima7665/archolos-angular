import { Routes } from '@angular/router';
import { ItemListComponent } from './modules/item/pages/list/item-list.component';
import { itemRoutes } from './modules/item/item.routes';

export const routes: Routes = [
	{
		path: 'items',
		loadChildren: () => import('./modules/item/item.routes').then(r => r.ItemModule),
	},

	{
		path: 'test',
		loadChildren: () => import('./modules/aaa-test/test.routes').then(r => r.TestPagesModule),
	},
];
