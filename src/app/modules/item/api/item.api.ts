import { Injectable } from "@angular/core";
import { Item, ItemCreateData } from "../interfaces/item.interface";
import { ItemType } from "../enums/item-type.enum";
import { FoodApi } from "../modules/food/api/food.api";
import { FoodCreateData } from "../modules/food/interfaces/food.interface";

@Injectable({providedIn: 'root'})
export class ItemApi {
    constructor(private readonly foodApi: FoodApi) {}

    public add(data: ItemCreateData): Promise<Item> {
        if (this.isFoodData(data)) {
            return this.foodApi.add(data);
        }

        return null as any;
    }

    private isFoodData(data: ItemCreateData): data is FoodCreateData {
        return data.type === ItemType.Food;
    }
}