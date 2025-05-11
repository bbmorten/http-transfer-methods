#!/bin/bash

# Parameters
INTERFACE=$1
NODE_FILE=$2
HOSTNAME=$3
PORT=$4
DURATION=$5

if [ -z "$INTERFACE" ] || [ -z "$NODE_FILE" ] || [ -z "$HOSTNAME" ] || [ -z "$PORT" ] || [ -z "$DURATION" ]; then
  echo "Usage: $0 <interface> <node_file> <hostname> <port> <duration>"
  exit 1
fi

# Generate capture file name
CAPTURE_FILE="captures/range-server_$(date +%Y%m%d%H%M%S).pcap"

# Log the commands executed to the console for user reference
echo "Command executed: tshark -i \"$INTERFACE\" -f \"tcp port $PORT\" -a duration:\"$DURATION\" -w \"$CAPTURE_FILE\""
echo "Command executed: node \"$NODE_FILE\""
echo "Command executed: curl -v -r 0-1023 \"http://$HOSTNAME:$PORT/download\""
echo "Command executed: curl -v \"http://$HOSTNAME:$PORT/download\""
echo "Command executed: wireshark -r \"$CAPTURE_FILE\""

# Start tshark in the background
(tshark -i "$INTERFACE" -f "tcp port $PORT" -a duration:"$DURATION" -w "$CAPTURE_FILE") &
TSHARK_PID=$!

# Start the Node.js server
node "$NODE_FILE" &
NODE_PID=$!

sleep 2 # Give the server time to start

# Test range request using curl
echo "Testing range request (first 1024 bytes)..."
curl -v -r 0-1023 "http://$HOSTNAME:$PORT/download"
# Download another range
curl -v -H "Range: bytes=1024-2047" "http://$HOSTNAME:$PORT/download"
# Test full file download using curl
echo "Testing full file download..."
curl -v "http://$HOSTNAME:$PORT/download"

# Wait for tshark to complete
wait $TSHARK_PID

# Kill the Node.js server
kill $NODE_PID

# Output the location of the capture file
echo "Traffic captured in $CAPTURE_FILE"

# Pause to ensure server has time to shut down
sleep $((DURATION + 2)) # Wait for the server to finish

# Open Wireshark to analyze the capture
wireshark -r "$CAPTURE_FILE" &
