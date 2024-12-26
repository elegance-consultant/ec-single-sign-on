# Use a Node.js base image with the appropriate version
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies. Use --no-cache for cleaner builds in CI/CD
RUN npm ci --no-cache

# Copy the rest of the application code
COPY . .

# Build the Next.js application for production in standalone mode
RUN npm run build

# --- Production Stage ---
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./

# Copy the public files
COPY --from=builder /app/public ./public

# Copy necessary files from node_modules (if needed)
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma # Example for Prisma

# Set environment variables (if needed)
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js server
CMD ["node", "server.js"]