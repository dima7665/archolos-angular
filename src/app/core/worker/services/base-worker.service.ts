// import { WorkerType } from "../enums/worker-type.enum";

// export abstract class BaseWorkerService {
// 	public worker!: Nullable<SharedWorker>;
// 	public readonly ports: MessagePort[] = [];

// 	public readonly appConfigService = { appVersion: '1' };

// 	public abstract handleMessage(event: MessageEvent): void;
// 	public abstract createWorker(): SharedWorker;

// 	public init(): Promise<void> {
// 		return 1 as any;
// 		return new Promise((resolve, reject) => {
// 			try {
// 				// Call the method to create the worker, to be defined in child classes
// 				this.worker = this.createWorker();
// 				this.setupBeforeUnloadListener();
// 				console.log('worker port', this.worker.port);

// 				this.worker.port.start();
// 				this.ports.push(this.worker.port);

// 				this.worker.port.postMessage({ type: WorkerType.Init });

// 				this.worker.port.addEventListener('message', event => {
// 					if (event.data.type === WorkerType.Init) {
// 						resolve();
// 						return;
// 					}

// 					if (event.data.type === WorkerType.Error) {
// 						reject(new Error(event.data.message));
// 						return;
// 					}

// 					this.handleMessage(event);
// 				});
// 			} catch (error) {
// 				reject(error);
// 			}
// 		});
// 	}

// 	public setupBeforeUnloadListener(): void {
// 		window.addEventListener('beforeunload', () => this.disconnect(), { once: true });
// 	}

// 	public disconnect(): void {
// 		if (!this.worker?.port) {
// 			console.warn('Worker is already disconnected or not available.');

// 			return;
// 		}

// 		try {
// 			this.worker.port.postMessage({ type: WorkerType.Disconnect });
// 			this.worker.port.close();
// 		} catch (error) {
// 			console.error('Failed to disconnect from worker:', error);
// 		}
// 	}
// }
