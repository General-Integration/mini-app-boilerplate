# Use an official Node.js runtime as the base image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Expose the port that your Vue development server will run on (default is 8080)
EXPOSE 8080

# Start the development server
CMD ["npm", "run", "serve"]


# TO RUN THIS DOCKERFILE IN DEVELOPMENT 
# YOU HAVE TO BUILD
# USING THIS COMMAND
# docker build -t vuejs/vuejs-app  .
# RUN IT !! REMOVE IT IF DUPLICATE USING docker rm vuejs-docker (in case error with duplicate containers's name)
# bind volumn to real time changes files (yet docker doesn't know to auto reload browser for now we have to reload it manually)
# docker run --name vue-js-docker -p 8080:8080 -v $(pwd):/app vuejs/vuejs-app