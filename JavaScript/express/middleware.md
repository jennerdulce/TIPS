# Express Middleware

- What does it do?
  - A series of functions that the request "goes through"
  - Each function receives `request`, `response` and `next` as parameters
  - Application Middleware run on every route/request
    - Error Handling, Logging, BODY Parsing
  - Route Middleware runs on specific routes
    - Are you logged in?

Middleware runs your code, and then runs the `next()` middleware in the series.

```javascript
// within myLogger module
function myLogger(req,res,next) {
  console.log(req.method);
  next(); // runs the next middleware in line
}
```

If you call `next()` with an argument, it'll skip all remaining middleware and run your error handler, with that argument as the error

```javascript
function loggedIn(req,res,next) {
  if( validUser ) { next(); } // Run the next middleware
  else { next("you need to login"); } // Run the error handler, skipping all other middleware
}
```

> Your route handler (your normal `(req,res)` function) is always the last middleware in the series!
