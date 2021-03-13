'use strict';

const bcrypt = require('bcrypt')
const base64 = require('base-64');
const User = require('../../models/user.js');

module.exports = async function (req, res, next) {
  let basicAuthParts = req.headers.authorization.split(' ');
  let encodedUser = basicAuthParts.pop();
  let decoded = base64.decode(encodedUser);
  let [username, password] = decoded.split(':');
  try {

    const user = await User.findOne({ username: username });
    const valid = await bcrypt.compare(password, user.password);
    req.userInfo = user
    if (valid) {
      next()
    } else {
      next('Invalid Login')
    }

  } catch{
    console.error('Something went wrong..')
  }
}