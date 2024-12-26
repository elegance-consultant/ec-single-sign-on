# Use a Node.js base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# --- Stage 2: Production image ---
FROM node:18-alpine

WORKDIR /app

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./

# Copy the public folder
COPY --from=builder /app/public ./public

# Copy the static files
COPY --from=builder /app/.next/static ./.next/static

# Expose the port your app runs on
EXPOSE 3000

# Set the startup command
CMD ["node", "server.js"]