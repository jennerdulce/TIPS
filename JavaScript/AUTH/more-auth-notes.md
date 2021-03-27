# Bearer Authorization

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
