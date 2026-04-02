import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const testRoutes: Routes = [
	{
		path: 'worker',
		loadComponent: () => import('./pages/worker/worker-test.component').then((c) => c.TestWorkerComponent),
	},

	{ path: '**', redirectTo: 'worker' },
];

@NgModule({
	imports: [RouterModule.forChild(testRoutes)],
	exports: [RouterModule],
})
export class TestPagesModule {}
