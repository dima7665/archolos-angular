import { Component, input } from '@angular/core';
import { TableModule } from '@app/modules/shared/table/table.module';
import { RecipeTableRowComponent } from '../recipe-table-row/recipe-table-row.component';
import { RecipeItem } from '../../interfaces/recipe.interface';

@Component({
	selector: 'recipe-table',
	templateUrl: './recipe-table.component.html',
	styleUrl: './recipe-table.component.scss',
	imports: [TableModule, RecipeTableRowComponent],
})
export class RecipeTableComponent {
	public readonly items = input.required<RecipeItem[]>();
}
