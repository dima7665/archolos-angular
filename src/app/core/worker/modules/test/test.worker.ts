const ports = new Set<MessagePort>(); // Store all connected ports

// @ts-ignore
onconnect = function (e: MessageEvent) {
	const port = e.ports[0];
	ports.add(port);

	port.onmessage = function (msg: MessageEvent) {
		// console.log('worker onmessage', msg.data, ports.size);

		ports.forEach((p) => p.postMessage(msg.data));
	};

	port.start();
};
