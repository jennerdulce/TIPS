```javascript
// in middleware module..

module.exports = (req, res, next) => {
  if (!req.query.name){
    next('error message here')
  }
  next()
}
```
- if `next()` has a string as an argument, that string will be passed in as the `err` argument within the errorHandler module

```javascript
// in 500.js file / errorHandler module

module.exports = (err, req, res, next) => {
  const error = err.message ? err.message : err;
  res.status(500).json({
    status: 500,
    message: error
  })
}
```
- `err` within the errorHandler module is where the `next('error message here')` is passed through
- the message entered in as a string will be used as a message as an alternative if err.message does not exist.