# Bearer Authorization

Using a "Bearer Token" to re-authenticate with a server following a successful login, or obtaining/generating a permanent key

## Learning Objectives

### Students will be able to

#### Describe and Define

- Bearer Authentication
- JSON Web Tokens (jwt)
- Web Security
- When to use Basic or Bearer Authentication

#### Execute

- Create a Bearer Token Auth System
- Secure tokens

## Today's Outline

<!-- To Be Completed By Instructor -->

## Notes

### Bearer Tokens

- Bearer Tokens are sent to the user/client after the initial `signin` process has completed.
- Clients must make every subsequent request to the server with that token, in the header
  - `Authorization: Bearer encoded.jsonwebtoken.here`
- The server opens the token, does the re-authentication, and then grants or denies access
- In express servers, this can be done in middleware, in conjunction with a user model

  ```javascript
  app.get('/somethingsecret', bearerToken, (req,res) => {
    res.status(200).send('secret sauce');
  });

  function bearerToken( req, res, next ) {
    let token = req.headers.authorization.split(' ').pop();
    try {
      if ( tokenIsValid(token) ) { next(); }
    }
    catch(e) { next("Invalid Token") }
  }

  function tokenIsValid(token) {
    let parsedToken = jwt.verify(token, SECRETKEY);
    return Users.find(parsedToken.id);
  }
  ```

### Mongoose Virtual Fields

Mongoose allows to add "Virtual" fields to our data model. A virtual field is a property of your data model that:

1. Is defined by you, using a function
1. Added to your data model every time a record is fetched from the database (automatically)
1. Exists only in memory as you access your record
1. Therefore ... virtual fields are never saved to the database

For example, here's a simple data model that describes a piece of food:

```javascript
const food = mongoose.Schema({
  name: {type:"String", required:true},
  calories: {type:"Number", required:true}
  type: {type: "String", enum:["vegetable", "carb", "protien"]}
})
```

Assume you have an instance, such as a piece of bread:

```json
{
  name: "Wonder Bread",
  calories: 100,
  type: "carb"
}
```

In practice, you might want to calculate some value on each food item, based on it's properties. This is a value that has merit in the real world, but isn't something you need to store in the database. In fact, the user entering the data wouldn't actually know how to calculate this anyway.

For our example, let's add a new virtual field called "points" which is an arbitrary figure that'll tell you how healthy something is.

Add this to your mongoose food schema

```javascript
food.virtual('points').get( function() {
  let points = this.calories;
  if ( type === "carb" ) { points = this.calories * 10; }
  else if ( type === "protien" ) { points = this.calories * .5; }
  else if ( type === "vegetable" ) { points = this.calories * .2; }
  return points;
});
```

Now, anytime you get a record from mongoose, using `.find()`, `findOne()`, `findOneById()`, etc, the data that you can see on your record would be this:

```json
{
  name: "Wonder Bread",
  calories: 100,
  type: "carb"
  points: 1000
}
```

If you were to save that record, points would not be stored, it's a calculated value, but you can use this feature of mongoose to create data fields on the fly that can help you to keep information accessible to your code, while not having to persist it.

<!-- ====================================================================== -->

## JWT (JSON Web Token)

- `const jwt = require('jsonwebtoken')`
- set up `secret` 
- route based authorization
- check to see if user has credentials
- you need to have a token to enter this route
- add this line as part of the user schema:
  - `toJSON: { virtuals: true }` allows us to link tables or create virural relationships

```javascript
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { toJSON: { virtuals: true } });

```

```javascript
// to create a new token every time
users.virtual('token').get(function () {
  let token = {
    username: this.username
  }
  return jwt.sign(token, SECRET, {expiresIn: '30 days'}); // this is what creates a token for us; combinds the username and secret
});
```

## Morgan

- logs incoming requests
- gives you more info about request
- shows you length of time users take to access parts of your app

```javascript
app.use(morgan('dev'));
```

## Hooks

- this will run before the method you enter as an argument, in this example we use save
- `users.pre('mongodb method', async function() )`

```javascript
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
})
```

## Implementation of AUTH

- In this iteration, we separated the AUTH sections into methods as part of the model schema. by doing this, we further separate concerns
- these specfically control the actions that talk to the database (mongodb specifically)

```javascript
// checks password with hashed password from the database
// this will be implemented as part of the `basic-auth` middleware which will be put into the `sign in` route
users.statics.authenticateBasic = async function (username, password) {
  // search DB with username to retrieve data
  const user = await this.findOne({ username });
  // compare the decoded password with encrypted password
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('THIS IS WHAT TRIGGERS ERROR FOR CATCH STATEMENT');
}

// verifies token will be implemented as part of the `bearer-auth` middleware which will be put into a route where a token will be needed to access it
users.statics.authenticateToken = async function (token) {
  const parsed = await jwt.verify(token, SECRET);
  const user = await this.findOne({ username: parsed.username })
  if (user) { return user; }
  throw new Error('INVALID TOKEN')
}
```

## Middleware

- objective of the middlewares is to first validate information that is passed from the front end to the back end
- extract the information (username and password) and then pass them as arguments into schema model methods which are then used to extract data from the database

### basic

```javascript
module.exports = async (req, res, next) => {
  // username and pw not passed through headers
  // console.log('req.headers', req.headers)
  if (!req.headers.auth) {
    next('Sorry, you are not authorized');
  }

  // upon signin, user info is encoded and passed from client to server
  // user and pass is then sent to be authenticated..
  let basic = req.headers.auth.split(' '). pop();
  let [user, pass] = base64.decode(basic).split(':');

  // users.authenticateBasic(user, pass)
  //   .then(user => {
  //     req.user = user;
  //     // console.log(`THIS IS REQ.USER${req.user}`)
  //     next()
  //   })
  //   .catch( e => next('Login does not exist..')) // THIS IS WHERE IT CATCHES AND PASSES TO ERROR HANDLER


  try {
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (e) {
    res.status(403).json({
      status: 403,
      message: 'Login does not exist'
    })
  }
```

### bearer

```javascript
module.exports = async (req, res, next) => {
  if (!req.headers.auth) {
    next('User invalid');
  }

  let token = req.headers.auth.split(' ').pop();

  users.authenticateToken(token)
    .then(user => {
      req.user = user;
      next()
    })
    .catch(e => res.status(403).json({
      status: 403,
      message: 'Invalid token'
    }))
}
```



## THE FLOW


<!-- GENERAL FLOW OF AUTH -->