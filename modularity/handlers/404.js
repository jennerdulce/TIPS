// what we want to create is just a handler just like creaing any other handler.. except this time as it's own module.
// we will import this module to use in the server.js

'use strict';
  // this is a handler we are sending back an object or we can send back a json file
  
module.exports = (req, res) => {
  res.status(200).send({
    error: 404,
    route: req.path,
    message: 'route not found'
  })
}