import { Component, input } from '@angular/core';
import { Item } from '@app/modules/item/interfaces/item.interface';
import { MiscTableRowComponent } from '../misc-table-row/misc-table-row.component';
import { TableModule } from '@app/modules/shared/table/table.module';

@Component({
	selector: 'misc-table',
	imports: [TableModule, MiscTableRowComponent],
	templateUrl: './misc-table.component.html',
	styleUrl: './misc-table.component.scss',
})
export class MiscTableComponent {
	public readonly items = input.required<Item[]>();
}
