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
CAPTURE_FILE="captures/http2-push-server_$(date +%Y%m%d%H%M%S).pcap"

# Parametrize the SSLKEYLOGFILE path
SSLKEYLOGFILE=${SSLKEYLOGFILE:-./captures/sslkeys.log}

# Log the commands executed to the console for user reference
echo "Command executed: tshark -i \"$INTERFACE\" -f \"tcp port $PORT\" -a duration:\"$DURATION\" -w \"$CAPTURE_FILE\""
echo "Command executed: NODE_OPTIONS=\"--tls-keylog=$SSLKEYLOGFILE\" node \"$NODE_FILE\""
echo "Command executed: curl -v --http2 -k \"https://$HOSTNAME:$PORT\""
echo "Command executed: export SSLKEYLOGFILE=\"$SSLKEYLOGFILE\" && wireshark -r \"$CAPTURE_FILE\" &"

# Start tshark in the background
(tshark -i "$INTERFACE" -f "tcp port $PORT" -a duration:"$DURATION" -w "$CAPTURE_FILE") &
TSHARK_PID=$!

# Start the Node.js server with the SSLKEYLOGFILE environment variable
NODE_OPTIONS="--tls-keylog=$SSLKEYLOGFILE" node "$NODE_FILE" &
NODE_PID=$!

sleep 2 # Give the server time to start

# Test the server using curl
curl -v --http2 -k "https://$HOSTNAME:$PORT"

# Wait for tshark to complete
wait $TSHARK_PID

# Kill the Node.js server
kill $NODE_PID

# Output the location of the capture file
echo "Traffic captured in $CAPTURE_FILE"

# Corrected the sleep command to pause for $DURATION plus 2 seconds
sleep $((DURATION + 2)) # Wait for the server to finish

# Open Wireshark using the SSLKEYLOGFILE as a parameter
export SSLKEYLOGFILE="$SSLKEYLOGFILE" && wireshark -r "$CAPTURE_FILE" &


