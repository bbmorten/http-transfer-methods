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

## Prerequisites

1. Node.js installed
2. Wireshark for packet analysis
3. OpenSSL for HTTPS certificates
4. tshark (command-line version of Wireshark)
5. curl for testing HTTP requests

## Setup

First, generate SSL certificates for HTTPS:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
-keyout localhost-key.pem -out localhost-cert.pem
```

Then, install dependencies:

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
