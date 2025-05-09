# Use the official Node.js 18 image as the base image
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app


# Install dependencies

# RUN npm install

# Set the default command to run the traditional-server.js file
CMD ["sh", "-c", "cd /usr/src/app && node ${ENTRY_FILE:-traditional-server.js}"]


