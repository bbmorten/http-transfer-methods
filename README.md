# HTTP Transfer Methods Examples

This project demonstrates various HTTP transfer methods and includes tools for testing and analyzing HTTP/HTTPS traffic. It includes examples of traditional HTTP servers, chunked transfer encoding, HTTP/2 server push, and YouTube video downloading capabilities.

## Server Examples

### 1. Traditional HTTP Server

- `traditional-server.js` - Basic HTTP server implementation
- `traditional-server-64.js` - HTTP server with Base64 encoding support
- `test_traditional_server.sh` - Test script for the traditional server

### 2. Chunked Transfer

- `chunked-server.js` - HTTP server implementing chunked transfer encoding
- `test_chunked_server.sh` - Test script for the chunked transfer server

### 3. HTTP/2 Server

- `http2-push-server.js` - HTTP/2 server implementation (Note: Server Push disabled in Node.js v16.0.0+)
- `test_http2-push-server.sh` - Test script for the HTTP/2 server

### 4. YouTube Download Tools

- `youtube.js` - Base YouTube functionality
- `youtube-real-download.js` - Enhanced YouTube downloader with subtitle support
- `youtube-yt-dlp-download.js` - YouTube downloader using yt-dlp
- `download-all.sh` - Batch download script
- `print-codecs.sh` - Tool for analyzing video codecs

### 5. WebSocket Server

- `websocket-server.js` - WebSocket server implementation
- `test_websocket_server.sh` - Test script for the WebSocket server

### 6. Server-Sent Events (SSE)

- `sse-server.js` - Server-Sent Events (SSE) server implementation
- `test_sse_server.sh` - Test script for the SSE server

### 7. HTTP Range Requests

- `range-server.js` - HTTP server supporting range requests
- `test_range_server.sh` - Test script for the range request server

## Prerequisites

1. Node.js installed
2. Wireshark for packet analysis
3. OpenSSL for HTTPS certificates
4. tshark (command-line version of Wireshark)
5. curl for testing HTTP requests

## Setup

1. Generate SSL certificates for HTTPS:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
-keyout localhost-key.pem -out localhost-cert.pem
```

1. Install dependencies:

```bash
npm install
```

## Usage

### Testing HTTP/2 Server

```bash
./test_http2-push-server.sh <interface> http2-push-server.js localhost 3002 10
```

Parameters:

- interface: Network interface to capture (e.g., lo0 for localhost)
- Node.js file to run
- hostname
- port
- duration (in seconds)

The script will:

1. Start packet capture using tshark
2. Launch the HTTP/2 server
3. Send test requests using curl
4. Capture SSL session keys for analysis
5. Open Wireshark with the captured traffic

### Testing WebSocket Server

```bash
./test_websocket_server.sh <interface> websocket-server.js localhost 3003 30
```

Parameters:

- `interface`: Network interface to capture (e.g., `lo0` for localhost)
- `node_file`: The WebSocket server file to run
- `hostname`: The hostname (e.g., `localhost`)
- `port`: The port number (e.g., `3003`)
- `duration`: Duration of the test in seconds

The script will:

1. Start packet capture using `tshark`
1. Launch the WebSocket server
1. Test the HTTP endpoint using `curl`
1. Test the WebSocket endpoint using `websocat`
1. Save the captured traffic to a `.pcap` file
1. Open Wireshark for analysis

### Testing SSE Server

```bash
./test_sse_server.sh <interface> sse-server.js localhost 3004 30
```

Parameters:

- `interface`: Network interface to capture (e.g., `lo0` for localhost)
- `node_file`: The SSE server file to run
- `hostname`: The hostname (e.g., `localhost`)
- `port`: The port number (e.g., `3004`)
- `duration`: Duration of the test in seconds

The script will:

1. Start packet capture using `tshark`
1. Launch the SSE server
1. Test the SSE endpoint using `curl`
1. Save the captured traffic to a `.pcap` file
1. Open Wireshark for analysis

### Testing Range Request Server

```bash
./test_range_server.sh <interface> range-server.js localhost 3005 30
```

Parameters:

- `interface`: Network interface to capture (e.g., `lo0` for localhost)
- `node_file`: The range request server file to run
- `hostname`: The hostname (e.g., `localhost`)
- `port`: The port number (e.g., `3005`)
- `duration`: Duration of the test in seconds

The script will:

1. Start packet capture using `tshark`
1. Launch the range request server
1. Test range requests using `curl` (e.g., partial and full file downloads)
1. Save the captured traffic to a `.pcap` file
1. Open Wireshark for analysis

### Notes

- Ensure `websocat` is installed for WebSocket testing. Install it using:

  ```bash
  brew install websocat
  ```

- Captured traffic is saved in the `captures/` directory with a timestamped filename.

### YouTube Downloads

1. Download video with subtitles:

```bash
node youtube-real-download.js <YouTube-URL>
```

2. Analyze video codecs:

```bash
./print-codecs.sh <video-file>
```

Downloaded videos and subtitles are stored in the `downloads/` directory.

## Traffic Analysis

The project includes tools for capturing and analyzing HTTP traffic:

- Captures are stored in the `captures/` directory with timestamps
- SSL keys are logged to `sslkeys.log`
- Use Wireshark with the SSL keylog file for HTTPS traffic analysis
- Each test script automatically captures and saves traffic for analysis

## Project Structure

- `captures/` - Network capture files (.pcap)
- `downloads/` - Downloaded YouTube videos and subtitles
- `.github/instructions/` - Project coding standards
- `*.js` - Server implementations
- `test_*_server.sh` - Test scripts
- `*.pem` - SSL certificates

## Logging

- Network captures are saved with timestamps
- Download history in `download-log.txt`
- Download commands in `download-all.sh`
- SSL session keys in `sslkeys.log`

## Docker Support

The project includes Docker support:

```bash
docker-compose up
```

## Contributing

Follow the coding standards in `.github/instructions/` when contributing:

- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Write descriptive comments
- Use proper linting
