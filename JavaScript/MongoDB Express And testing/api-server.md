## General
- same notes as class-03 but we are implementing MongoDB as a database

### Mongoose
- mongoose does 2 main things:
  1. connects to a MongoDB database
  2. allows us to use methods that talk to the database

#### connecting to MongoDB Database
- within the `index.js` file:

```javascript

'use strict';

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGODB_URL, options)
  .then(() => {
    server.start(PORT);
  })
  .catch(err => console.error(err));
```

- you need `dotenv` to retrieve the mongoDB URI,
  - this URI changes from local when you are connecting to a local database
    - locally URI is: 'mongodb://localhost:27017/databaseName'
  - to Atlas which is the cloud database. changes to atlas because you set the MONGODB_URI in the setting to the atlas URI on Heroku.
- mongoose allows us to connect to a MongoDB database
- server allows us to start the server within index file
- options are configurations to be used toward connecting to the DB
- mongoose.connect links the app to the DB
- run the server after connection to the DB has been made

#### creating a model/schema/collection
- represent a blueprint for some type of resource

```javascript
const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
  name: { type: String, required: true},
  breed: { type: String, required: true},
  age: { type: Number, required: true}
});

// ultimately creates a collection/table with this structure when invoked with a data-collection class/wrapper
const dogModel = mongoose.model('dog', dogSchema);
// 'dog' names the table
module.exports = dogModel;

```

#### creating a wrapper
- the point of this is that we will instantiate this wrapper with a model

```javascript
//  wrapper for our CRUD actions to perform on collection
class Collection {
  constructor(models) {
    this.model = models
  }

  read(id) {
    if (id) {
      return this.model.findOne({ _id: id});
    } else {
      return this.model.find({})
    }
  }

  create(obj) {
    let newObj = new this.model(obj);
    return newObj.save()
  }

  update(_id, obj) {
    return this.model.findByIdAndUpdate(_id, obj, { new: true });
  }

  delete(_id){
    return this.model.findByIdAndDelete(_id);
  }
}

module.exports = Collection
```

- this will ultimately allow us to use MongoDB methods on the table that we have created
- i asuume `new this.model` creates a new entry when an object is inserted
- the collection model is called a wrapper because when we pass in a schema into it, it ultimately creates a collection/table within your database
  - to add on to this, you have to remember that this model is just like any ordinary class that has methods in it
  - since `this.model` pertains to the actual collection that is inside the database, the methods within this class are MONGODB METHODS and ARE BEING USED ON THE TABLE.

#### creating the routes
- things to import:
  - express
    - to allow the user of `express.Router()`
    - `.get() .post() .put() .delete()`
  - the collection model /wrapper
  - the schema/blueprint
- create a variable and invoke the collection with a schema as an argument.

``` javascript
const express = require('express');
const dogSchema = require('../models/dog.js'); // collection
const Dogs = require('../models/data-collection-class.js'); // wrapper
const dogs = new Dogs(dogSchema);

const dogRoute = express.Router();

dogRoute.get('/dog', getDogs);
dogRoute.get('/dog/:id', getDog);
dogRoute.post('/dog', createDog);
dogRoute.put('/dog/:id', updateDog);
dogRoute.delete('/dog/:id', deleteDog);

async function getDogs(req, res) {
  let all = await dogs.read();
  res.status(200).json(all);
}

async function getDog(req, res) {
  let id = req.params.id;
  let dog = await dogs.read(id);
  res.status(200).json(dog);
}

async function createDog(req, res) {
  let obj = req.body;
  console.log(obj);
  let newDog = await dogs.create(obj);
  res.status(201).json(newDog);
}

async function updateDog(req, res) {
  let id = req.params.id;
  let content = req.body;
  let updated = await dogs.update(id, content);
  res.status(200).send(updated);
}

async function deleteDog(req, res) {
  let id = req.params.id;
  let deleted = await dogs.delete(id);
  res.status(204).send('Dog successfully deleted..');
}

module.exports = dogRoute;
```
- the route handlers within this route file are what actually trigger the CRUD methods that we created in our collection file.
- again, these actions are CRUD actions. CRUD actions are used to Create, retrieve, update, or delete information from the database
- the collection model is called a wrapper because when we pass in a schema into it, it ultimately creates a collection/table within your database
  - to add on to this, you have to remember that this model is just like any ordinary class that has methods in it
  - since `this.model` pertains to the actual collection that is inside the database, the methods within this class are MONGODB METHODS and ARE BEING USED ON THE TABLE.
- purpose of ASYNC/AWAIT functions:
  - when talking to APIs / Databases.. your program needs time to retrieve this data and return the data back a promise
  - without ASYNC/AWAIT, the function will try to respond without the data

#### bringing into the server
- import the routes that you need and `app.use(routes)` on the server page

#### testing
- first ensure you have all packages installed
  - `npm init -y`
  - `npm install express mongoose @code-fellows/supergoose dotenv jest supertest`
- import:
  - initialize supergoose
    - connects to a pseudo MongoDB database that resets with every run
  - supertest
  - your server
  - a variable to invoke supertest with your apps/routes as an argument
  - your schemas
  - your collection model
  - a variable to invoke your collection with a schema as an argument

```javascript
require('@code-fellows/supergoose');
const supertest = require('supertest');
const server = require('../src/server.js');
const request = supertest(server.app);
const dogModel = require('../src/models/dog.js');
const birdModel = require('../src/models/bird.js');
const DataCollection = require('../src/models/data-collection-class');
const dogRoute = new DataCollection(dogModel);
const birdRoute = new DataCollection(birdModel);
```
- you can pass in objects through your POST routes by attaching a `.send(obj)` method on your route:
  - `await request.post('/bird').send(obj)`
- as like any API request, you need to access with infomation by using a `.then(result => )` method
  - you access the information by doing a `result.body`
- i found that running these tests, the mock database data is kept from the previous tests..
- you can choose to 