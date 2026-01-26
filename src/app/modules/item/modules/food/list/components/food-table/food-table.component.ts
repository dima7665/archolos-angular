import { TableModule } from 'app/modules/shared/table/table.module';
import { FoodTableRow } from '../food-table-row/food-table-row.component';
import { Component, input } from '@angular/core';
import { FoodItem } from '../../../interfaces/food.interface';

@Component({
	selector: 'food-table',
	templateUrl: './food-table.component.html',
	imports: [FoodTableRow, TableModule],
})
export class FoodTable {
	public readonly items = input.required<FoodItem[]>();
}
