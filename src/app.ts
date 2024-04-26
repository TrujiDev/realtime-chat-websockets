import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocket.WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
	console.log('Client connected');

	ws.on('error', console.error);

	ws.on('message', function message(data) {
		const payload = JSON.stringify({
			type: 'Custom-Message',
			payload: data.toString(),
		});
		// ws.send(JSON.stringify(payload));

		// Mensajes en ambos clientes
		// wss.clients.forEach(function each(client) {
		// 	if (client.readyState === WebSocket.OPEN) {
		// 		client.send(payload, { binary: false });
		// 	}
		// });

		//Mensaje en el cliente receptor
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(payload, { binary: false });
			}
		});
	});

	// ws.send('Hello from server!');

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});
