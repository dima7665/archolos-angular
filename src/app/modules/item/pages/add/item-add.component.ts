import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { itemTypeOptions } from '../../constants/item-option';
import { ItemForm } from '../../form/item.form';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationModule } from 'app/modules/shared/validation/validation.module';
import { AppInputComponent } from 'app/modules/shared/form/modules/input/components/input.component';
import { AppSelectComponent } from 'app/modules/shared/form/modules/select/components/select.component';
import { ItemApi } from '../../api/item.api';
import { ItemCreateData, ItemIncludes } from '../../interfaces/item.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemType } from '../../enums/item-type.enum';
import { ConsumableInfoFormComponent } from '../../modules/food/components/consumable-info-form/consumable-info-form.component';
import { ItemFormService } from './service/item-form.service';
import { ConsumableStat } from '../../interfaces/consumable.interface';
import { SubSink } from 'subsink';
import { map } from 'rxjs';

@Component({
	selector: 'item-add',
	templateUrl: 'item-add.component.html',
	styleUrl: 'item-add.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		ReactiveFormsModule,
		ValidationModule,
		AppInputComponent,
		AppSelectComponent,
		ConsumableInfoFormComponent,
	],
	providers: [ItemFormService],
})
export class ItemAddComponent implements OnInit {
	public readonly type = toSignal(this.route.queryParams.pipe(map((params) => params['type'])));

	public readonly formGroup = new ItemForm({ type: this.type() }).formGroup;

	public readonly stats = signal<Nullable<ItemIncludes>>(null);

	public readonly itemTypeOptions = itemTypeOptions;
	public readonly ItemType = ItemType;

	private readonly subs = new SubSink();

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly itemApi: ItemApi,
		private readonly itemFormService: ItemFormService
	) {}

	public ngOnInit(): void {
		this.subs.sink = this.formGroup.controls.type.valueChanges.subscribe((type) =>
			this.router.navigate([], { queryParams: { type } })
		);
	}

	public async onSubmit(): Promise<void> {
		// console.log('add', this.itemFormService.invalid, this.itemFormService.getValue(this.type()));

		if (this.formGroup.invalid || this.itemFormService.invalid) {
			this.formGroup.triggerValidation();
			this.itemFormService.triggerValidation();
			return;
		}

		// console.log('VALID');
		// return;
		const res = await this.itemApi.add({
			...this.formGroup.value,
			...this.itemFormService.getValue(this.type()),
		} as ItemCreateData);
		console.log('submit', res);

		// TODO: could return error if duplicate stats (consumableStats)

		return;
		this.router.navigate(['items']);
	}

	public onCancel(): void {
		this.router.navigate(['items']);
	}

	public getConsumableStats(): ConsumableStat[] {
		if (!this.stats() || ![ItemType.Food, ItemType.Potion].includes(this.type()!)) {
			return [];
		}

		return this.stats()!.consumableStats;
	}
}
