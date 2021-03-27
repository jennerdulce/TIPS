# AUTH TEAM PROJECT

## Sending info from frontend to backend

- the group and I had 2 solutions to accomplish this

### SOLUTION 1:

```javascript
 <form id="sign-up-form" action="/some route" method="POST">
          <input id="sign-up-username" type="text" class="username" name="username" placeholder="Enter Username">
          <input id="sign-up-role" type="Role" class="Role" name="Role" placeholder="Enter Role">
          <input id="sign-up-password" type="password" class="password" name="password" placeholder="Enter Password">
          <textarea id="sign-up-bio" name="bio" class="content" cols="30" rows="10"></textarea>
          <button>SUBMIT</button>
  </form>
```

- in previous labs, we sent information from forms DIRECTLY to the backend but assigning a route within the `action=""` attribute within a form

- however, this was not a good solution because we knew that request information had to be passed in different ways such as headers or base64 encoded.. You cannot do this using this method.

### SOLUTION 2:

```javascript
 <form id="sign-up-form" method="POST">
          <input id="sign-up-username" type="text" class="username" name="username" placeholder="Enter Username">
          <input id="sign-up-role" type="Role" class="Role" name="Role" placeholder="Enter Role">
          <input id="sign-up-password" type="password" class="password" name="password" placeholder="Enter Password">
          <textarea id="sign-up-bio" name="bio" class="content" cols="30" rows="10"></textarea>
          <button>SUBMIT</button>
  </form>


    $('#sign-up-form').submit(function (event) {
      event.preventDefault();
      let username = $('#sign-up-username').val()
      let password = $('#sign-up-password').val()
      let role = $('#sign-up-role').val()
      let bio = $('#sign-up-bio').val()
      let user = {
        username: username,
        password: password,
        role: role,
        bio: bio
      }

      const ajaxSettings = {
        method: 'POST',
         data: user   // GETS PASSED IN AS REQ.BODY          
      };

      $.ajax(`/signup`, ajaxSettings)
        .then(data => {
          $('#output-box').text(JSON.stringify(data))
        });
    })


    headers: {
          authorization: `Basic ${userinfo}` // send through header
        }   
```

- solution 2 was what we went with.

- this solution uses an event handler to retrieve the information from a form to pass into an jquery AJAX calls

- ajax setting: these setting are literally setting for the call.. I took some reading and investigation to see how this worked. But basically, there are keywords within ajax calls which configure on what the request object will look like.

- we set the route method by assigning a key value pair

- `data` writes information into the body of the request object

- `headers` is another setting that you can choose to write into the headers of the request object

## General

### TIPS

- when debugging within routes, check directly into the middleware. the route is called and immediately begins with processing the request object through the route level middlewares

- `app.use(express.static('./public'));` is used for PUBLIC FACING files CREATE A PUBLIC FOLDER along with this global middleware. CSS and the front end javascript file were not working because they were not in a `public` folder

- ensure that the use of `app.use(cors())` before your routes

#### Rendering the frontend page

```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```

- this line is awesome. remember it