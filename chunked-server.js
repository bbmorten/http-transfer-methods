// ---------------------------
// 2. Chunked HTTP Transfer (Stream)
// ---------------------------
// Save as chunked-server.js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Set Transfer-Encoding header
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked'
    });

    // Send data in chunks with delays to simulate progressive generation
    let count = 0;
    const interval = setInterval(() => {
      // Create a chunk of 1000 bytes
      const chunk = Buffer.alloc(1000).fill('B'.charCodeAt(0));
      res.write(chunk);

      count++;
      if (count >= 10) {
        clearInterval(interval);
        res.end(); // End the response after sending 10 chunks
      }
    }, 300); // Send a chunk every 300ms
  }
});

server.listen(8013, () => {
  console.log('Chunked HTTP server running on port 8013');
});