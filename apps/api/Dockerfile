FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ../../package*.json ./
# Bundle app source
COPY . .

# If you are building your code for production
RUN npm install --production
# RUN npm install --only=production
RUN npx nx build api

# Set environment variables if needed
# ENV DB_PASSWORD='secret'

EXPOSE 3000
CMD [ "node", "../../dist/apps/api/main.js" ]
