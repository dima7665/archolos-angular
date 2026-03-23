import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { itemTypeOptions } from '../../constants/item-option';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationModule } from '@app/modules/shared/validation/validation.module';
import { ItemType } from '../../enums/item-type.enum';
import { AppSelectComponent } from '@app/modules/shared/form/modules/select/components/select.component';
import { ConsumableFormComponent } from '../../modules/consumable/modules/consumable-form/components/consumable-form/consumable-form.component';
import { MiscFormComponent } from '../../modules/misc/pages/add/misc-form.component';

@Component({
	selector: 'item-add',
	templateUrl: 'item-add.component.html',
	styleUrl: 'item-add.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ReactiveFormsModule, ValidationModule, ConsumableFormComponent, MiscFormComponent, AppSelectComponent],
})
export class ItemAddComponent {
	public readonly options = itemTypeOptions;
	public readonly selectedType = signal(this.route.snapshot.queryParams['type'] || this.options[0].key);

	public readonly ItemType = ItemType;

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute
	) {
		effect(() => {
			this.router.navigate([], { relativeTo: this.route, queryParams: { type: this.selectedType() } });
		});
	}
}
