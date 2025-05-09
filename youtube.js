const https = require('https');
const { https: followHttps } = require('follow-redirects');
const fs = require('fs');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },
  rejectUnauthorized: false // Ignore insecure connections
};

const fileStream = fs.createWriteStream('downloaded_video.mp4');

followHttps.get('https://youtu.be/0kJ7o5S2faQ?si=uci7iU5BL1A0cJpY', options, (response) => {
  let totalBytes = 0;
  let chunkCount = 0;

  console.log('Starting video stream...');

  // Process each chunk as it arrives
  response.on('data', (chunk) => {
    chunkCount++;
    totalBytes += chunk.length;
    console.log(`Chunk ${chunkCount}: Received ${chunk.length} bytes (Total: ${totalBytes} bytes)`);

    // Write the chunk to the file
    fileStream.write(chunk);

    // Simulate video player processing the chunk
    console.log(`Playing chunk ${chunkCount}...`);
  });

  // When all chunks have been received
  response.on('end', () => {
    console.log('Video stream ended.');
    console.log(`Total chunks received: ${chunkCount}`);
    console.log(`Total data received: ${totalBytes} bytes`);
    fileStream.end(); // Close the file stream
  });

  // Handle errors
  response.on('error', (err) => {
    console.error('Error during video stream:', err);
    fileStream.end(); // Ensure the file stream is closed on error
  });
});