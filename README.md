# Michael Kors Web Production CMS  ***MK-WEB-Production-CMS***

## Local Development
Development is a breeze. Once you have installed all your dependencies all the configuration is done for you. The process is outlined below.
```
1. Checkout the respective branch from mk-web repo
2. ---CLIENT: CD into client folder and run 'npm install'
3. Execute ‘npm rund dev’ inside client folder to run client side app. Access the following URL in the browser. http://localhost:3000/
4. ---SERVER: To start the server, cd into server folder.
5. execute ‘node index.js’ 
6. Access the following URL in the browser. http://localhost:3001/
```

## Features:
- TO BE UPDATED SOON

- **Unit Tests** with Zest and Enzyme
  - Reducers
  - Components
  - Synchronous and Asynchronous Actions

- Express 4.x server with a ton of middleware

### Why Redux + Redux-Saga
- a single store
- state being read-only (you have to express an intent to mutate being creating actions)
- mutations written as pure functions

make it very fun and easy to write **predictable** code! There's a ton of reasons why, but you should head to the [Redux docs](http://redux.js.org/index.html) to dive in!


### Unit Tests
Testing with:
- `karma` as test runner
  - `karma.conf.js` for the main karma configuration (it has webpack configurations)
  - `tests.webpack.js` which is the single entry file. It uses `webpack`'s require API to find all the files we need that have a `-test.js` suffix.
- `mocha` as the test framework
- `jsdom` as my test environment

```bash

#### Run test once
npm test

#### Run in watch mode
npm test:watch
```
Unit tests for async (redux) actions, reducers, and components.


## Build and Deployment
```
TO BE UPDATED SOON
```
