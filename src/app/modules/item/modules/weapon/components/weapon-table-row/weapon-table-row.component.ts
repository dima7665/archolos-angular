import { Component, input } from '@angular/core';
import { WeaponItem } from '../../interfaces/weapon.interface';

@Component({
	selector: 'tr[weaponTableRow]',
	templateUrl: './weapon-table-row.component.html',
	styleUrl: './weapon-table-row.component.scss',
})
export class WeaponTableRowComponent {
	public readonly item = input.required<WeaponItem>();
}
