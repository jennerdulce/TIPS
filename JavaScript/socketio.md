# Socket.io (Links to an external site.) App / Event Driven Applications
## Sending Data through REPL

- in order to send data through the terminal/REPL/Node we had to require the package called repl
what this allowed us to do is evaluate what is being passed within the REPL while the client is running
repl.start({ prompt: , eval: (text) => { process.stdout.write('\u001b[1F'); socket.send({text, username}) }, })
prompt: defaults what the empty line should look like

- eval: evaluates the text/data that you pass in through the command line

- uses a callback function to grab the text, and from here we are able to use socket.send which emits a message event
https://nodejs.org/api/repl.html#repl_repl_start_options (Links to an external site.)

- https://blog.bitsrc.io/build-a-command-line-real-time-chat-app-using-socketio-f2e3553d6228 (Links to an external site.)

## Clearing the Terminal

- we had to figure out a way to clear out the terminal VIA Javascript

- used process.stdout.write('') to modify what is presented on the terminal for our game

- process.stdout.write('\x1B[2J'); Clears the whole terminal

- process.stdout.write('\u001b[1F'); Clears the previous line typed in

- the importance of this one is because when you press enter, the line of text that you typed out is displayed which make the client UI unattractive
http://etutorials.org/Programming/actionscript/Appendix+A.+Unicode+Escape+Sequences+for+Latin+1+Characters/ (Links to an external site.)

- https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797 (Links to an external site.)

## Ngrok

- Ngrok is a testing tool that allows communication to the server on different clients in different locations
first you start the ngrok server by typing `ngrok http 3000` in the terminal
then you copy the forwarding http request
plug this request into the hostvariable; this variable is typically http://localhost:3000 or any local connection / URL

## Chalk

- chalk is an awesome way to put some color in your world
- first import the package into your app
- typically used within console.log(chalk.green()) to change the color of text

## General

- Showing message on all computers including the person who sent out the message
- For a lot of the listeners within the server. we had to socket.broadcast.emit() as well as socket.emit()so that the client would receive the message on their end as well.
we found that either of those two alone would not produce the outcome that we wanted

## Sentence

- so there was a problem with the game..
- The game only accepts the answer of the USER WHOS STARTED IT
- we found that the typing start somehow creates an instance of the game that only the user is able to play.
- the sentence variable within the client is only set on the person who started it
- the sentence variable is undefined on the other players sentencevariable
- we believe that this problem has to deal with the socket. since the socket.id is unique to everyone personal client, calling start creates a special instance that other players cannot see/access
- to solve this problem we added a property called sentence on all of the users within the game where the sentence is stored
  - by doing this, the sentence is no longer tied to the socket and all of the players can participate in the game
 
## Dynamic Client

- this was pretty cool
- we made the client dynamic allowing us to share the code/file which wouldnt affect any of the other players
- people who have the client only have to change the usernamevariable within the file to change who their name
- this information would then be passed to the server where a new player object is created using the username inputted as a key for that object
```javascript
client let username = 'jenner' socket.on('connect', () => { 
console.log('Connected to CHATROOM'); 
socket.emit('newPlayer', username) }) // server 
const players = { // fills in as users connect }; 

socket.on('newPlayer', payload => { socket.broadcast.emit('joined', payload) 
socket.emit('joined', payload) // adds new player players[payload] = new Player(payload) })
```

## Object.keys()

- Object.keys() was extra useful to interate throw the player list and retrieve and change information
- Object.keys(players).forEach(value => { players[value].sentence = sentence; })

## Allowing only 1 winner

- im pretty sure theres a better way to do this..
- but to allows only 1 winner per round.. we push the users into an array. there is an if statement that only runs when there is 1 user within the array. so that when all other users are pushed into the array when finished, the line of code will not run because the condition is no longer met
```javascript
if (payload.text.split('\n')[0] === players[payload.username].sentence) { // stop game and display winner 
winner.push('Someone won') 
if (winner.length === 1) { 
// reset sentence 
sentence = sentences[Math.floor(Math.random() * sentences.length)] 
Object.keys(players).forEach(value => { players[value].sentence = sentence; }) 
// increment score 
players[payload.username].score++ 
socket.broadcast.emit('round', payload) 
socket.emit('round', payload)
if (players[payload.username].score === 3) { socket.broadcast.emit('winner', payload) 
socket.emit('winner', payload) winner.pop() 
} else { // reset winner.pop() nextQuestion(socket, sentence) } }
```
REFER TO 401 LAB 14
