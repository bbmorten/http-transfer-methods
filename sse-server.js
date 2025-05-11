// ---------------------------
// 5. Server-Sent Events (SSE)
// ---------------------------
// Save as sse-server.js
// curl -v http://localhost:3004/events
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    // Set headers for SSE
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Send initial comment to keep connection open
    res.write(':\n\n');

    // Send an event every second
    let count = 0;
    const interval = setInterval(() => {
      // SSE format: event: type\nid: id\ndata: data\n\n
      res.write(`id: ${count}\n`);
      res.write(`data: Event #${count}\n\n`);

      count++;
      if (count >= 10) {
        clearInterval(interval);
        res.end(); // End the response after sending 10 events
      }
    }, 1000);

    // Handle client disconnect
    req.on('close', () => {
      clearInterval(interval);
    });
  } else {
    // Serve a simple HTML page that connects to the event stream
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSE Demo</title>
        </head>
        <body>
          <h1>Server-Sent Events Demo</h1>
          <div id="events"></div>
          <script>
            const evtSource = new EventSource("/events");
            evtSource.onmessage = function(event) {
              const el = document.getElementById("events");
              el.innerHTML += event.data + "<br>";
            }
          </script>
        </body>
      </html>
    `);
  }
});

server.listen(3004, () => {
  console.log('SSE server running on port 3004');
});