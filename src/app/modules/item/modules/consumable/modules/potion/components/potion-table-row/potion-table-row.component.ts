import { Component, input } from "@angular/core";
import { ConsumableItem } from "../../../../interfaces/consumable.interface";

@Component({
    selector: 'tr[potionTableRow]',
    templateUrl: './potion-table-row.component.html',
})
export class PotionTableRowComponent {
    public readonly item = input.required<ConsumableItem>();
}
