'use strict';

module.exports = (error, req, res, next) => {
  // this is a handler we are sending back an object or we can send back a json file
  res.status(200).send({
    error: 500,
    route: req,path,
    message: 'server error'
  })
}