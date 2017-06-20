FROM node:alpine

# Create app directory
RUN mkdir -p /app

RUN npm install npm@4 -g
RUN npm install node-gyp -g
RUN node-gyp install

WORKDIR /app
ADD package.json /app/package.json

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]