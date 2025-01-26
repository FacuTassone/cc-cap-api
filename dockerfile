# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
