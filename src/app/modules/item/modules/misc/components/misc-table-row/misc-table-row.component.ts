import { Component, input } from '@angular/core';
import { Item } from '@app/modules/item/interfaces/item.interface';

@Component({
	selector: 'tr[miscTableRow]',
	templateUrl: './misc-table-row.component.html',
	styleUrl: './misc-table-row.component.scss',
})
export class MiscTableRowComponent {
	public readonly item = input.required<Item>();
}
