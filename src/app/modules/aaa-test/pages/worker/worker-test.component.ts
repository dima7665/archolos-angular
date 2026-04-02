import { Component, effect, signal } from '@angular/core';
import { TestWorkerService } from '@app/core/worker/modules/test/test-worker.service';
import { AppInputComponent } from '@app/modules/shared/form/modules/input/components/input.component';
import { TestOneComponent } from "../../components/test-one/test-one.component";

@Component({
	selector: 'test-worker',
	templateUrl: './worker-test.component.html',
	imports: [AppInputComponent, TestOneComponent],
})
export class TestWorkerComponent {
	public readonly value = signal('');

    private readonly worker = this.testWorkerService.createWorker();

    constructor(private readonly testWorkerService: TestWorkerService) {
        effect(() => {
            console.log('value changed', this.value());
            this.worker.port.postMessage(this.value());
        });
    }

    public ngOnInit(): void {
        console.log('onInit', this.worker);
    }

	public onStartClick(): void {
		console.log('start');
        this.worker.port.start();
	}

	public onStopClick(): void {
		console.log('stop');
        this.worker.port.close();
	}
}
