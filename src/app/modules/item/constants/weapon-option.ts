import { WeaponDamageType, WeaponSkill, WeaponType } from '../modules/weapon/enums/weapon.enum';

export const weaponTypeOptions = [
	{ key: WeaponType.Onehanded, text: 'One-handed' },
	{ key: WeaponType.Twohanded, text: 'Two-handed' },
	{ key: WeaponType.Bow, text: 'Bow' },
	{ key: WeaponType.Crossbow, text: 'Crossbow' },
];

export const weaponDamageTypeOptions = [
	{ key: WeaponDamageType.Blade, text: 'Blade' },
	{ key: WeaponDamageType.Blunt, text: 'Blunt' },
	{ key: WeaponDamageType.Arrow, text: 'Piercing' },
	{ key: WeaponDamageType.Magic, text: 'Magic' },
	{ key: WeaponDamageType.Fire, text: 'Fire' },
];

export const weaponSkillTypeOptions = [
	{ key: WeaponSkill.Onehanded, text: 'One-handed' },
	{ key: WeaponSkill.Twohanded, text: 'Two-handed' },
	{ key: WeaponSkill.Bow, text: 'Bow' },
	{ key: WeaponSkill.Crossbow, text: 'Crossbow' },
	{ key: WeaponSkill.Magic, text: 'Magic' },
];
