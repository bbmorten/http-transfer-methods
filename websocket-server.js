// ---------------------------
// 4. WebSockets
// ---------------------------
// Save as websocket-server.js
const http = require('http');
const WebSocket = require('ws'); // You need to install this: npm install ws

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server running');
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial message
  ws.send('Connected to WebSocket server');

  // Send periodic messages
  let count = 0;
  const interval = setInterval(() => {
    ws.send(`Message #${count++}`);
    if (count >= 5) {
      clearInterval(interval);
    }
  }, 1000);

  // Handle messages from client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

server.listen(3003, () => {
  console.log('WebSocket server running on port 3003');
});