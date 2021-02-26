# Testing

## setup for testing
1. Install `jest` and `superagent` so that you can run your tests
  - `npm install jest superagent express`
2. Create a `__test__` folder
3. Within the `__test__` folder, create a test file
  - this test file should match the name of the js file that you want to test.
  - `server.js` -> `server.test.js`
4. Add the proper testing scrips to your `package.json` file
  ```
    // package.json
   "scripts": {
     "test": "jest --coverage",
   }
   ```
5. Run tests on demand by `npm test`

## Server Testing

- Generally, avoid starting the actual server for testing
- Instead, export your server as a module in a library
- Then, you can a "mocking library" such as `supertest` to run your tests
  - This will hit your routes as though your server was running, without actually starting it

server.js

```javascript
const express = require('express');
const app = express();
app.get('/data', (req,res) => res.json({}));
// Export an object with the "app" in it.
module.exports = {
  start: () => app.listen(3000),
  server: app
}
```

server.test.js

```javascript
const supertest = require('supertest');
const myServer = require('server.js');
const client = supertest(myServer.server);
describe('test-suite', () => {
  test('what youre actually testing', async () => {
    await client.get('/data')
      .then( response => {
        expect(response.body).toBeDefined();
      })
  })
})
```
