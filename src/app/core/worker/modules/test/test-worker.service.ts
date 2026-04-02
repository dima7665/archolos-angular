import { Injectable } from '@angular/core';
import { WorkerType } from '../../enums/worker-type.enum';

@Injectable({
	providedIn: 'root',
})
export class TestWorkerService {
	public worker: Nullable<SharedWorker>;

	public handleMessage(): void {}

	public createWorker(): SharedWorker {
		if (this.worker) {
			this.worker.port.onmessage = (event) => {
				console.log('port onmessage event', event.data);
			};

			return this.worker;
		}

		this.worker = new SharedWorker(new URL('/test.worker', import.meta.url), {
			type: 'module',
			name: 'archolos-test-worker',
		});

		this.worker.port.onmessage = (event) => {
			console.log('port onmessage event', event.data);
		};

		this.worker.port.start();

		// window.addEventListener('beforeunload', () => this.disconnect(), { once: true });

		return this.worker;
	}

	public disconnect(): void {
		console.log('disconnect');
		if (!this.worker?.port) {
			console.warn('Worker is already disconnected or not available.');

			return;
		}

		try {
			this.worker.port.postMessage({ type: WorkerType.Disconnect });
			this.worker.port.close();
		} catch (error) {
			console.error('Failed to disconnect from worker:', error);
		}
	}
}
