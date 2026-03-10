import { Component, computed, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination, PaginationEvent } from '../../interfaces/pagination.interface';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
	imports: [MatPaginatorModule],
})
export class PaginationComponent {
	public readonly data = input.required<Pagination>();
	public readonly disabled = input(false);
	public readonly showFirstLastButtons = input(true);

	public readonly pageIndex = computed(() => {
		const page = this.data().currentPage;

		return page > 0 ? page - 1 : 0;
	});

	public readonly pageChange = output<PaginationEvent>();

	public onPageChange(ev: PageEvent): void {
		this.pageChange.emit({
			count: ev.length,
			currentPage: ev.pageIndex + 1,
			perPage: ev.pageSize,
			previousPage: (ev.previousPageIndex ?? 0) + 1,
		});
	}
}
