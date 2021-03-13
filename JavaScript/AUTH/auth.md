# Authorization

## Authentication / Authorization

- gives users ability to sign up and sign in
- passwords need to go through REAL authentication

- Authentication:
  - sign-up / login

- Authorization:
  - accessing adin routes / pages
  - route specific controls

## encryption / BCRYPT

- crazy algorithm / cyper algorithm
- unbreakable way to encrypt passwords
- is super secure
- SERVER -> DATABASE
- BCRYPT

```javascript
// front end
let details = 'username:password' 


// backend
'use strict';

const bcrypt = require('bcrypt');
const User = require('../../models/user.js');

module.exports = async function (req, res, next) {
  try {
    if (req.body.username && req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      const saveUser = await user.save(req.body)
      req.savedUser = saveUser;
      next();
    } else {
      next('Invalid username or password')
    }

  } catch {
    console.error('Something went wrong..')
  }
}
```

- a username and password is pass through the body and immediately encrypted VIA `bcrypt` and put into the database
- always creates a unique hash

### Hashing

- SALT
  - complexity / how much you want to encrypt your password
  - 5 - 10
  - rounds of salt on hash
    - more salt = longer time to hash

```javascript
async function encrypt(password, salt)
let hashed = await bcrypt.hash(password, salt)
```

- does not give back raw 'text' back

```javascript
bcrypt.compare(enteredPassword, hash)
```

## encoding / BASE64

- simple tools to encode and decode things (password mainly)
- not secure at all
- FRONT-END -> SERVER
- BASE64

```javascript
let details = 'jennerdulce:12345'
let encoded = base64.encode(details)
let decoded = base64.decode(encoded)
```

- encoding typically happens in the front end before it is passed to the backend
- infromation is then decoded when received at the server

## Basic/Bearer Auth

### Basic auth

- signup and sign in
- pass info over (encoded)

### Bearer Auth

- pass route a token to verify that we have access to route
- bearer of token is allowed access to certain types of information
  - admin, owner, etc

## WORKFLOW

### SIGN UP

- REFER TO ENCRYPT

1. user signs up via form field
2. information is passed through the body
3. password is hashed immediately
4. user information is stored in DB (MongoDB)


### SIGN IN

- REFER TO VERIFYPASSWORDS

1. take info from form fields
- base64 -> 'username:password'
  - encryption happens in form field

2. user info is put on the header

3. grab encoded info

4. decode info

5. extract password

6. run through bcrypt

## General

- Know fundamental structures of sign up and sign in frameworks
- remember in order to modify a SCHEMA/COLLECTION, you have to import the module