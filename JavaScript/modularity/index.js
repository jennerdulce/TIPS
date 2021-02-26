'use strict';

const PORT = process.env.PORT || 3000
const server = require('./server.js');
const { networkInterfaces } = require('os');
// 'server-modularity.js' should have a 'module.exports' in it
// what you choose to name is the object and this object = module.exports from the file that you 'required'
// go check in 'server-modularity.js' and see the value of 'module.exports'

// server is now an object that has .app and .start properties
server.start(process.env.PORT)


// ====================================================
// # TIPS
// in this case..
// server = module.exports = {
//   app: app,
//   start: start
// }
// - instead of `node server.js`, you can not start server by `node index.js`
// - the importance is that networkInterfaces, we have a server.js file that contains JUST a server
// - we will be able to create tests on this server later