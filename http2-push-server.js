// ---------------------------
// 3. HTTP/2 Server Push
// ---------------------------
// Save as http2-push-server.js
const http2 = require('http2');
const fs = require('fs');
const path = require('path');

// Create self-signed certificate for HTTPS (required for HTTP/2)
// You need to generate these files:
// openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-key.pem -out localhost-cert.pem

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

server.on('stream', (stream, headers) => {
  if (headers[':path'] === '/') {
    // Respond to the original request
    stream.respond({
      'content-type': 'text/html',
      ':status': 200
    });

    // Create HTML that references a CSS file
    const html = `<!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <h1>HTTP/2 Server Push Demo</h1>
        </body>
      </html>`;

    // Push the CSS file before it's requested
    const pushStream = stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
      if (err) throw err;
      pushStream.respond({
        ':status': 200,
        'content-type': 'text/css'
      });
      pushStream.end('.h1 { color: red; }');
    });

    // Send the HTML response
    stream.end(html);
  } else if (headers[':path'] === '/style.css') {
    // Handle direct requests for the CSS file
    stream.respond({
      ':status': 200,
      'content-type': 'text/css'
    });
    stream.end('.h1 { color: red; }');
  }
});

server.listen(3002, () => {
  console.log('HTTP/2 Server Push running on port 3002');
});