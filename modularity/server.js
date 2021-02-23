'use strict';

// pulls in express
const express = require('express');

// import middleware
const stamper = require('./middleware/stamper.js');

// import handlers
const notFoundHandler = require('/handlers/404.js')
const errorHandler = require('/handlers/500.js')

// invoking express creates and object
// invokes express. app ultimately becomes an object. app can now use .listen, .get, .put etc..
const app = express();

// MIDDLEWARE
// OLD
// app.get('/', (req, res) => {
//   console.log('hi')
// })

// NEW
// app.get('/', mw1, mw2, mw3, mw4, (req, res) => {

//   }
// )

app.get('/', stamper, (req, res) => {
  let output = {
    num: 10,
    cool: false,
    time: req.timestamp 
    // demonstrates usability of internal middle function so you can use on other ends
  }
  res.status(200).json(output)
})
// VERBAGE:
// - get route this route will respond to oncoming get request with this endpoint. its endpoint is ''. after request is MediaDeviceInfo, we run the request through a middleware called stamper which adds a timestamp property to the request/req Object.

// implementing routes with handlers
// handlers are plugged in like any other handler as before
app.use('*', notFoundHandler)
app.use(errorHandler)

// OLD
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`)
// })

// NEW
function start(port) {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
  })
}

// HOW TO EXPORT
module.exports = {
  app: app,
  start: start
}



// ==========================================================
// # TIPS

// - we want to modularize our code so that we can run tests and import/export into other files
// - making things into modules makes code cleaner, allows us to run tests, changes are easier to navigate and make.
// - smaller, clearer, more concise

// ## MODULE EXPORTS
// - a module is a javascript file that can be imported/exported and used in other files.
// - browser:
//   - `this` keyword refers to outermost layer WINDOWS
// - terminal/REPL/javaruntime
//   - `this` keyword refers to outermost layer GLOBAL
//   - node has a database built in where you can store modules
//     - *module.exports*

// ## MIDDLEWARE
// - middleware modifies before server receives
// - give opportunity to modify request
//   - request is an object

// ### multiple types of middleware
// - GLOBAL
//   - `app.use(cors())`
//   - `.use()` is an example of GLOBAL middleware
//     - every request will get touched

// - ROUTE
// - `app,get('/', middleware1, middleware2, middleware3, (request, response) => {})`
//   - `app,get('/', middleware, (request, response) => {})`
//   - this placement, we can modifty and attach things to request