1. import 'superagent' package
  - `const superagent = require('superagent')` // imports
  - install in terminal `npm install superagent`

2. obtain key and API url link
  - `const key = process.env.KEY` // retrieves key from .env for safe keeping
  - `const url = 'API URL AND INSERT KEY AND OTHER DATA' // will be used for request to the API`
  - these variables will go in handlers
  
3. send out request
```
let someVariable = 1234
superagent.get(url) // sends out request to api
  
  .then( data => { // this is APIs response called a PROMISE
    let location = data.body // adding .body retrieves the array of objects we need
    let locationData = new Location(someVariable, location) // tailor; put through constructor
    response.status(200).json(locationData) // send
  })
  .catch(err => {
  console.log(err)
  });
```
