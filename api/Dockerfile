FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy server code
COPY server.js ./
COPY .env ./

# Expose port 80 (Matching Coolify's default)
EXPOSE 80

# Environment variable for port
ENV PORT=80

# Start the server
CMD ["node", "server.js"]
