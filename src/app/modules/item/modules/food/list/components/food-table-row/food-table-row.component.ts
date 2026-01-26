import { Component, input } from '@angular/core';
import { FoodItem } from '../../../interfaces/food.interface';

@Component({
	selector: 'tr[foodTableRow]',
	templateUrl: './food-table-row.component.html',
})
export class FoodTableRow {
	public readonly item = input.required<FoodItem>();
}
