# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port (matches your server.js)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
