import { Item, ItemCreateData } from '@app/modules/item/interfaces/item.interface';
import { WeaponDamageType, WeaponSkill, WeaponType } from '../enums/weapon.enum';

interface _WeaponData {
	type: WeaponType;
	damage: number;
	damageType: WeaponDamageType;
	range?: Nullable<number>;
	armorPiercing?: Nullable<number>;
	skill: WeaponSkill;
	skillRequirement?: Nullable<number>;
	skillBonus?: Nullable<number>;
}

export type WeaponItem = Item & _WeaponData;

export type WeaponCreateData = ItemCreateData & _WeaponData;
