export class WorkerHelper {
	public static isSharedWorkerSupported(): boolean {
		return WorkerHelper.isBroadcastChannelSupported() && 'SharedWorker' in window;
	}

	public static isBroadcastChannelSupported(): boolean {
		return typeof BroadcastChannel !== 'undefined';
	}

	public static postMessage<T>(message: T, ports: MessagePort[]): void {
		ports.forEach(port => port.postMessage(message));
	}
}
