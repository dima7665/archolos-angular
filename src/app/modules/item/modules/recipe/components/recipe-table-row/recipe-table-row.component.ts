import { Component, input } from '@angular/core';
import { RecipeItem } from '../../interfaces/recipe.interface';

@Component({
	selector: 'tr[recipeTableRow]',
	templateUrl: './recipe-table-row.component.html',
	styleUrl: './recipe-table-row.component.scss',
})
export class RecipeTableRowComponent {
  public readonly item = input.required<RecipeItem>();
}
