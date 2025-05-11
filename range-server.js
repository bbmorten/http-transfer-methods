// ---------------------------
// 6. HTTP Range Requests
// ---------------------------
// Save as range-server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a large file for testing
function createLargeFile() {
  const filePath = path.join(__dirname, 'large-file.txt');
  const fileSize = 5 * 1024 * 1024; // 5MB

  if (!fs.existsSync(filePath)) {
    const fd = fs.openSync(filePath, 'w');
    for (let i = 0; i < fileSize; i += 1024) {
      const buffer = Buffer.alloc(1024).fill('C'.charCodeAt(0));
      fs.writeSync(fd, buffer, 0, buffer.length);
    }
    fs.closeSync(fd);
    console.log(`Created large file: ${filePath} (${fileSize} bytes)`);
  }

  return filePath;
}

const largeFilePath = createLargeFile();
const server = http.createServer((req, res) => {
  if (req.url === '/download') {
    // Get file stats
    const stat = fs.statSync(largeFilePath);
    const fileSize = stat.size;
    const rangeHeader = req.headers.range;

    if (rangeHeader) {
      // Parse range header
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;

      // Set headers for partial content
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'text/plain'
      });

      // Create read stream for specified range
      const fileStream = fs.createReadStream(largeFilePath, { start, end });
      fileStream.pipe(res);
    } else {
      // No range requested, serve entire file
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'text/plain',
        'Accept-Ranges': 'bytes'
      });

      fs.createReadStream(largeFilePath).pipe(res);
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Range Request Demo</title>
        </head>
        <body>
          <h1>HTTP Range Request Demo</h1>
          <p>Full download: <a href="/download">Download file</a></p>
        </body>
      </html>
    `);
  }
});

server.listen(3005, () => {
  console.log('Range Request server running on port 3005');
});