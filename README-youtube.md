# YouTube Download and Codec Information Scripts

This repository contains scripts for downloading YouTube videos, audio, and subtitles, as well as extracting codec and resolution information from downloaded files.

## Scripts

### 1. `youtube-real-download.js`

This script downloads the best video, audio, and subtitles from a YouTube URL.

#### Features

- Downloads the best video and audio streams.
- Downloads subtitles in multiple languages (e.g., English and Turkish).
- Saves the downloaded files in the `downloads/` folder.
- Logs the download process in `download-log.txt`.
- Appends the executed command to `download-all.sh` for future reuse.

#### Usage

1. Install dependencies:

   ```bash
   npm install youtube-dl-exec
   ```

2. Run the script with a YouTube URL:

   ```bash
   node youtube-real-download.js <YouTube-URL>
   ```

3. Example:

   ```bash
   node youtube-real-download.js https://youtu.be/example
   ```

#### Output

- Video, audio, and subtitle files are saved in the `downloads/` folder.
- Logs are appended to `download-log.txt`.
- The executed command is added to `download-all.sh`.

---

### 2. `print-codecs.sh`

This script extracts and displays codec and resolution information for downloaded files in the `downloads/` folder.

#### Features

- Prints video and audio codecs.
- Prints video resolution (width and height).

#### Usage

1. Make the script executable:

   ```bash
   chmod +x print-codecs.sh
   ```

2. Run the script:

   ```bash
   ./print-codecs.sh
   ```

#### Output

- Displays codec and resolution information for each file in the `downloads/` folder.

---

## Folder Structure

- `downloads/`: Contains downloaded video, audio, and subtitle files.
- `download-log.txt`: Logs details of each download.
- `download-all.sh`: Contains a list of executed download commands for reuse.

---

## Requirements

- Node.js
- FFmpeg (for `print-codecs.sh`)

---

## License

This project is licensed under the MIT License.
