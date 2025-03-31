import net from "net";

let sharedMessage = "Hello from TCP Server"; // Shared data
const clients = new Map<number, net.Socket>(); // Store connected clients
let clientIdCounter = 1;

// Function to broadcast a message to all clients
export const broadcastToClients = (message: string) => {
  clients.forEach((client) => {
     client.write(`From HTTP: ${message}\n`);
  });
};

// Create TCP Server
const tcpServer = net.createServer((socket) => {
  const clientId = clientIdCounter++;
  clients.set(clientId, socket);

  console.log(`TCP Client ${clientId} Connected`);
  socket.write("Welcome to the TCP Server!\n");

  socket.on("data", (data) => {
    sharedMessage = data.toString().trim();
    console.log(`Received from TCP Client ${clientId}:`, sharedMessage);
    broadcastToClients(sharedMessage); // Send to all clients
  });

  socket.on("end", () => {
    console.log(`TCP Client ${clientId} Disconnected`);
    clients.delete(clientId);
  });

  socket.on("error", (err) => {
    console.error(`TCP Error (Client ${clientId}):`, err.message);
    clients.delete(clientId);
  });
});

export { tcpServer, sharedMessage, clients };
