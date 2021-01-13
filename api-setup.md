# Setup an API
1. import 'superagent' package
  - `const superagent = require('superagent')` // imports
  - install in terminal `npm install superagent`

2. obtain key and API url link
  - `const key = process.env.KEY` // retrieves key from .env for safe keeping
  - `const url = 'API URL AND INSERT KEY AND OTHER DATA' // will be used for request to the API`
  - these variables will go in handlers
  
3a. send out request
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

3b. Sending out request using queries and headers
- you use this method if the API url and API docs tell you to do so..
- not all API URLS will allow you to insert your key or enter the query parameters in the URL directly
- In this example, API KEY is used as a HEADER using the `.set()` method.
```
const numPerPage = 5;
  const page = req.query.page || 1;
  const start = ((page - 1) * numPerPage + 1);
  const url = `https://api.yelp.com/v3/businesses/search`;
  let queryList = {
    latitude: req.query.latitude,
    longitude: req.query.longitude,
    limit: numPerPage,
    offset: start
  };

  superagent.get(url)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`) // set is always for key HTTP Headers; meta data for request
    .query(queryList)
    .then(promise => {
      console.log(promise.body);
      let restauraunts = promise.body.businesses.map(value => {
        return new Yelp(value);
      });
      res.status(200).json(restauraunts);
    })
    .catch(err => {
      console.log(err);
    });
```

3c. Sending out request using queries and headers
- you use this method if the API url and API docs tell you to do so..
- not all API URLS will allow you to insert your key or enter the query parameters in the URL directly
- In this example, API KEY is used as a query PARAMETER along with the other parameters using the `.query()` method.
```
const url = `https://api.themoviedb.org/3/search/movie`;
  let queryList = {
    api_key: process.env.MOVIES_API_KEY,
    query: req.query.search_query
  };

  superagent.get(url) 
    .query(queryList) // HERE
    .then(data => { // this is APIs response called a PROMISE
      let moviesPromise = data.body.results.map( movies => { // adding .body retrieves the array of objects we need
        return new Movie(movies); // tailor; put through constructor
      });
      res.status(200).json(moviesPromise);
    })
    .catch( (err) => {
      console.log(err);
    });
```

## TIPS
- USE POSTMAN to see what API's response looks like
- always do a `.body` on the API's Response
