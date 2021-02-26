----- HOW TO SET UP SERVER -----
1. make folder
  - cd into it
2. create '.env' file
  - `PORT=3000`
3. create package.json
  - in terminal: `npm init -y`
4. create `server.js` file
  -`'use strict';`
  - import modules/libs/dependencies. What dependencies do we want to use?
  - create full file
    - modules
      - `require.('dotenv').config()`
      - `const express = require('express')`
      - `const cors = require('cors')
    - set up application
      - `const app = express();`
      - `const PORT = process.env.PORT`
      - `app.use(cors());`
    - routes
      - `app.get('', (req,res) => {})`
    - start our server
      - `app.listen(PORT, ()=>{});`
5. install modules to project
  - in terminal: `npm install (express, cors, dotenv)`
6. check to see if server is working
  - in terminal: `node server.js`
  - in browser: `localhost:3000`
6. create github repo
  - completely empty
  - follow steps
7. search for repo in heroku app
