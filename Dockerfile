# Build stage
FROM node:20-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI globally
RUN npm install
RUN npm install -g @nestjs/cli

# Copy source code and .env
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy built application from build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy .env file
COPY .env ./

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]