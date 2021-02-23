// ensure that you are in a middleware directory
'use strict';

module.exports = (req, res, next) => {
  req.timestamp = new Date()
  next();
}

// we have modified the request object by adding a property called 'timestamp'
// we are now able to use this property when exported
// 'next()' executes the next middleware if there is any

// ==================================================
// # TIPS
// - you can make module.exports = to anything
// - 'next' is needed to run each middleware listed

// import by:
// const stamper = require('./stamper.js) into a different file
// stamper = this function
