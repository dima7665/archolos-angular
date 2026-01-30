import { Component, input } from "@angular/core";
import { PotionItem } from "../../interfaces/potion.interface";
import { PotionTableRowComponent } from "../potion-table-row/potion-table-row.component";
import { TableModule } from "app/modules/shared/table/table.module";

@Component({
    selector: 'potion-table',
    templateUrl: './potion-table.component.html',
    imports: [PotionTableRowComponent, TableModule],
})
export class PotionTableComponent {
    public readonly items = input.required<PotionItem[]>();

    // public readonly displayedColumns = ['id', 'name', 'price', 'stats']; // for mat-table
}
