import { Component } from '@angular/core';
import { TestWorkerService } from '@app/core/worker/modules/test/test-worker.service';

@Component({
	selector: 'test-one',
	templateUrl: './test-one.component.html',
	styleUrl: './test-one.component.scss',
	imports: [],
})
export class TestOneComponent {
	private readonly worker = this.testWorkerService.createWorker();

	constructor(private readonly testWorkerService: TestWorkerService) {
		console.log('test one');

		this.worker.port.onmessage &&
			(this.worker.port.onmessage = (e: MessageEvent) => {
				console.log('TestOne get message: ', e.data);
			});
	}

	public showPorts(): void {
		console.log(this.worker);
	}
}
