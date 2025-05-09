/*
  Usage:
    node youtube-yt-dlp-download.js https://youtu.be/YOUR_VIDEO_ID
*/

const fs = require('fs');
const path = require('path');
const ytdlp = require('yt-dlp-exec');

// Get the URL from the command line
const url = process.argv[2];
if (!url) {
  console.error('❌ Please provide a YouTube URL as a command-line argument.');
  process.exit(1);
}

// Define the download folder
const downloadFolder = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder);
}

const bestVideoOutput = path.join(downloadFolder, '%(title)s [%(id)s]_bestvideo.%(ext)s');
const bestAudioOutput = path.join(downloadFolder, '%(title)s [%(id)s]_bestaudio.%(ext)s');
const subtitleOutput = path.join(downloadFolder, '%(title)s [%(id)s]_subtitles.%(ext)s');

// Wrapper to call yt-dlp with base options
function runYtDlp(options) {
  return ytdlp(url, {
    ...options,
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
  });
}

// Run downloads
Promise.all([
  runYtDlp({
    output: bestVideoOutput,
    format: 'bestvideo',
  }),
  runYtDlp({
    output: bestAudioOutput,
    format: 'bestaudio',
  }),
  runYtDlp({
    skipDownload: true,
    writeSub: true,
    writeAutoSub: true,
    subLang: 'en,tr',
    output: subtitleOutput,
  }),
])
  .then(([videoResult, audioResult, subtitleResult]) => {
    console.log('✅ Video Downloaded:', videoResult);
    console.log('✅ Audio Downloaded:', audioResult);
    console.log('✅ Subtitles Downloaded:', subtitleResult);

    const command = `node youtube-yt-dlp-download.js ${url} # Best Video, Audio, Subtitles\n`;
    fs.appendFileSync(path.join(__dirname, 'download-all.sh'), command);

    const logEntry = `Downloaded: ${url}\nTimestamp: ${new Date().toISOString()}\n\n`;
    fs.appendFileSync(path.join(__dirname, 'download-log.txt'), logEntry);
  })
  .catch(err => {
    console.error('❌ Error:', err);
  });
