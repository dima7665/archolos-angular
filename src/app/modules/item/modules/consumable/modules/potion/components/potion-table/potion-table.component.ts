import { Component, input } from '@angular/core';
import { PotionTableRowComponent } from '../potion-table-row/potion-table-row.component';
import { TableModule } from '@app/modules/shared/table/table.module';
import { ConsumableItem } from '../../../../interfaces/consumable.interface';

@Component({
	selector: 'potion-table',
	templateUrl: './potion-table.component.html',
	imports: [PotionTableRowComponent, TableModule],
})
export class PotionTableComponent {
	public readonly items = input.required<ConsumableItem[]>();

	// public readonly displayedColumns = ['id', 'name', 'price', 'stats']; // for mat-table
}
