import { Component, input } from '@angular/core';
import { WeaponItem } from '../../interfaces/weapon.interface';
import { TableModule } from '@app/modules/shared/table/table.module';
import { WeaponTableRowComponent } from '../weapon-table-row/weapon-table-row.component';

@Component({
	selector: 'weapon-table',
	templateUrl: './weapon-table.component.html',
	styleUrl: './weapon-table.component.scss',
	imports: [TableModule, WeaponTableRowComponent],
})
export class WeaponTableComponent {
	public readonly items = input.required<WeaponItem[]>();
}
