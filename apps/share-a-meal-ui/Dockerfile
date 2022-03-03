# Create image based on the official Node 6 image from dockerhub
FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Get all the code needed to run the app into the workdir
# Files/folders to be excluded are in .dockerignore
COPY . /usr/src/app

# Set environment variables
ENV NODE_ENV=production

# Install dependecies
RUN npm install
RUN node_modules/.bin/ng build --configuration production --aot
# RUN npm run postinstall

# Expose the port the app runs in
EXPOSE 4200

# Serve the app in productionmode
CMD ["node", "server.js"]
