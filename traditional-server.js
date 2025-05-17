// ---------------------------
// 1. Traditional HTTP Transfer (Content-Length)
// 18 is Lo0 interface, find it from tshark -D output
// tshark -i 18 -f "tcp port 3000" -a duration:30 -w captures/traditional-server_$(date +%Y%m%d%H%M%S).pcap
// curl -v http://localhost:3000/
// tshark -i 2 -f "tcp port 3000" -a duration:30 -w captures/traditional-server_$(date +%Y%m%d%H%M%S).pcap
// curl -v http://192.168.68.110:3000
// ---------------------------
const http = require('http');

const PORT = 8013;
const HOST = '0.0.0.0';

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

server.listen(PORT, HOST, () => {
  console.log(`Traditionall HTTP server running on http://${HOST}:${PORT}`);
});