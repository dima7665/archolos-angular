import { Component, input } from '@angular/core';

@Component({
	selector: 'table[table]',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	imports: [],
	host: { '[style.--table-template-columns]': 'templateColumns()' },
})
export class TableComponent {
	public readonly templateColumns = input('', { alias: 'table' });
}
