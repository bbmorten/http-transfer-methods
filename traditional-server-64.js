// ---------------------------
// 1. Traditional HTTP Transfer (Content-Length)
// ---------------------------
const http = require('http');
const http2 = require('http2');

const PORT_IPV4 = 3000;
const PORT_IPV6 = 3001;
const HOST_IPV4 = '0.0.0.0';
const HOST_IPV6 = '::';

const createServer = (host, port) => {
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      // Generate complete response beforehand
      const data = Buffer.alloc(10000).fill('A'.charCodeAt(0));

      // Set Content-Length header
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': data.length
      });

      // Send entire response at once
      res.end(data);
    } else {
      // Handle unsupported routes
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });

  server.listen(port, host, () => {
    console.log(`Traditional HTTP server running on http://${host === '::' ? '[::]' : host}:${port}`);
  });
};

// Start servers for both IPv4 and IPv6 with different ports
createServer(HOST_IPV4, PORT_IPV4);
createServer(HOST_IPV6, PORT_IPV6);