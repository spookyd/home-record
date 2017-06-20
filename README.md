# Home Recorder

---

The purpose of this app is to expose an endpoint to record home events. 
In future releases I will have a [Node Red](nodered.org) integration.

## How to run

Standard machine installation is simple. Make sure you have the 
following environment setup.

### Environment
  - Node: v7.4.0
  - npm: v4.0.5
  - mongodb: min v2.6.5 to v3.0.4
  
### Setup

  1. Make sure you have all the right dependencies by running `npm install`
  1. Setup your `.env` file. Just run `cp .env.example .env`
  1. Make any changes to the configuration
  1. You can stage a user for authentication routes by running `node bin/stage.user.js`
  
  > To customize the user edit the `User` in the `stage.user.js` file.

#### Running Tests

Simply run `npm test`

#### Running the Development Server

Just run `npm start`

## Using Docker

Don't want to pollute your local machine and have docker installed then 
simply use the provided bin scripts. 

### Running Tests

Simply run `./bin/test.sh`

### Run the server in a container

  1. Start the container, `./bin/development.sh`
  1. Find the container id, `docker ps`
  1. Add a user, `docker exec -it <api container id>  node bin/stage.user.js`