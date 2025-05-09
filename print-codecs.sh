#!/bin/bash

DOWNLOADS_DIR="./downloads"

for file in "$DOWNLOADS_DIR"/*; do
  if [[ -f "$file" ]]; then
    echo "File: $file"
    video_codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "$file" 2>/dev/null)
    audio_codec=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "$file" 2>/dev/null)
    if [[ -n "$video_codec" ]]; then
      echo "  Video Codec: $video_codec"
    fi
    if [[ -n "$audio_codec" ]]; then
      echo "  Audio Codec: $audio_codec"
    fi
    video_resolution=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$file" 2>/dev/null)
    if [[ -n "$video_resolution" ]]; then
      echo "  Video Resolution: $video_resolution"
    fi
  fi
done