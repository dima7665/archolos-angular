import { Injectable } from "@angular/core";
import { Item, ItemCreateData } from "../interfaces/item.interface";
import { ItemType } from "../enums/item-type.enum";
import { ConsumableApi } from "../modules/consumable/api/consumable.api";
import { ConsumableCreateData } from "../modules/consumable/interfaces/consumable.interface";

@Injectable({providedIn: 'root'})
export class ItemApi {
    constructor(private readonly foodApi: ConsumableApi) {}

    public add(data: ItemCreateData): Promise<Item> {
        if (this.isFoodData(data)) {
            return this.foodApi.add(data);
        }

        return null as any;
    }

    private isFoodData(data: ItemCreateData): data is ConsumableCreateData {
        return true;
        // return data.type === ItemType.Food;
    }
}