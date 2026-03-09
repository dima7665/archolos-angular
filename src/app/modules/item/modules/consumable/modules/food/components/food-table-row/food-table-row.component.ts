import { Component, input } from '@angular/core';
import { ConsumableItem } from '../../../../interfaces/consumable.interface';
import { consumableStatI18n } from '../../../../i18n/consumable-stat.i18n';

@Component({
	selector: 'tr[foodTableRow]',
	templateUrl: './food-table-row.component.html',
})
export class FoodTableRowComponent {
	public readonly item = input.required<ConsumableItem>();

	public readonly consumableStatI18n = consumableStatI18n;
}
