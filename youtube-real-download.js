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

const bestVideoOutput = path.join(downloadFolder, '%(title)s [%(id)s]_bestvideo.%(ext)s');
const bestAudioOutput = path.join(downloadFolder, '%(title)s [%(id)s]_bestaudio.%(ext)s');
const subtitleOutput = path.join(downloadFolder, '%(title)s [%(id)s]_subtitles.%(ext)s');

Promise.all([
  youtubedl(url, {
    output: bestVideoOutput,
//    format: 'best', // Download the best video only
    format: 'bestvideo[height<=1080]+bestaudio/best[height<=1080]',
    // format: 'best[height<=2160]+bestaudio',
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    writeSub: true,             // Download subtitles
    subLang: 'en',              // Prefer Turkish subtitles
    writeAutoSub: true,         // Use auto-generated subs if necessary
    embedSub: true,             // Embed subtitles in the video file (if supported)
  }),
  youtubedl(url, {
    output: bestVideoOutput,
    format: 'best', // Download the best video only
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    writeSub: true,             // Download subtitles
    subLang: 'en',              // Prefer Turkish subtitles
    writeAutoSub: true,         // Use auto-generated subs if necessary
    embedSub: true,             // Embed subtitles in the video file (if supported)
  }),
  youtubedl(url, {
    output: bestAudioOutput,
    format: 'bestaudio', // Download the best video only
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
  }),

  

]).then(([videoOutput1, videoOutput2, audioOutput]) => {
  console.log('Video Download Output 1:', videoOutput1);
  console.log('Video Download Output 2:', videoOutput2);
  console.log('Audio Download Output 3:', audioOutput);

  // Append the executed command to download-all.sh with video, audio, and subtitle details
  const command = `node youtube-real-download.js ${url} # Best Video, Audio, and Subtitles\n`;
  fs.appendFileSync(path.join(__dirname, 'download-all.sh'), command);

  // Log the download process to a file
  const logFilePath = path.join(__dirname, 'download-log.txt');
  const logEntry = `Downloaded: ${url}\nVideo Output 1: ${videoOutput1}\nVideo Output 2: ${videoOutput2}\nAudio Output: ${audioOutput}\nTimestamp: ${new Date().toISOString()}\n\n`;
  fs.appendFileSync(logFilePath, logEntry);
}).catch(err => console.error('Error:', err));

