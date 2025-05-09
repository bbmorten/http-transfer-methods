/*
https://youtu.be/pREXvvdZQ1k?si=Xcr5KvjWbCZnoxlo

npm install youtube-dl-exec

*/

const fs = require('fs');
const path = require('path');
const youtubedl = require('youtube-dl-exec');

// Get the URL from the command line
const url = process.argv[2];
if (!url) {
  console.error('Please provide a YouTube URL as a command-line argument.');
  process.exit(1);
}

// Define the download folder
const downloadFolder = path.join(__dirname, 'downloads');

// Create the folder if it doesn't exist
if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder);
}

// Download the video
const outputFilePath = path.join(downloadFolder, '%(title)s [%(id)s].%(ext)s');

youtubedl(url, {
  output: outputFilePath,
  noCheckCertificates: true,
  noWarnings: true,
  preferFreeFormats: true,
  addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
}).then(output => console.log(output)).catch(err => console.error('Error:', err));
