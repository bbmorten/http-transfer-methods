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
CAPTURE_FILE="captures/websocket-server_$(date +%Y%m%d%H%M%S).pcap"

# Log the commands executed to the console for user reference
echo "Command executed: tshark -i \"$INTERFACE\" -f \"tcp port $PORT\"  -a duration:\"$DURATION\" -w \"$CAPTURE_FILE\""
echo "Command executed: node \"$NODE_FILE\""
echo "Command executed: curl -v \"http://$HOSTNAME:$PORT\""
echo "Command executed: websocat \"ws://$HOSTNAME:$PORT\""
echo "Command executed: wireshark -r \"$CAPTURE_FILE\""

# Start tshark in the background
(tshark -i "$INTERFACE" -f "tcp port $PORT"  -a duration:"$DURATION" -w "$CAPTURE_FILE") &
TSHARK_PID=$!

# Start the Node.js server
node "$NODE_FILE" &
NODE_PID=$!

sleep 2 # Give the server time to start

# Test HTTP endpoint using curl
echo "Testing HTTP endpoint..."
curl -v "http://$HOSTNAME:$PORT"

# Test WebSocket endpoint using websocat (needs to be installed)
echo "Testing WebSocket endpoint..."
echo "Use websocat in another terminal:"
echo "websocat ws://$HOSTNAME:$PORT"
echo "Testing will continue for $DURATION seconds..."

# Wait for tshark to complete
wait $TSHARK_PID

# Kill the Node.js server
kill $NODE_PID

# Output the location of the capture file
echo "Traffic captured in $CAPTURE_FILE"

# Pause to ensure server has time to shut down
sleep $((DURATION + 5)) # Wait for the server to finish

# Open Wireshark to analyze the capture
wireshark -r "$CAPTURE_FILE" &
