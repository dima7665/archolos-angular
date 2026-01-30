import { Component, input } from "@angular/core";
import { PotionItem } from "../../interfaces/potion.interface";

@Component({
    selector: 'tr[potionTableRow]',
    templateUrl: './potion-table-row.component.html',
})
export class PotionTableRowComponent {
    public readonly item = input.required<PotionItem>();
}
