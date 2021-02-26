# Express Routing

- Event driven system
  - `app.get('/thing', (req,res) => {})`
  - This is the same pattern we see in Vanilla JS, jQuery
  - 'When a get event happens in our server, on "/thing", run this function...'
- The Request Object
  - `(req,..)`
  - /:parameters
    - `app.get('/api/:thing',...)` = `req.params.thing`
  - Query Strings
    - `http://server/route?ball=round` = `req.query.ball`
- The Response Object
  - `(..., res)`
  - Responsible for sending data back to the browser
  - Has methods like `send()` and `status()` that Express uses to format the output to the browser properly
    - Sends Headers
      - Cookies
      - Status Codes
