//for easily access to paths inside the project
const path = require('path');
//load http
const http = require('http');
//load express
const express = require('express');
//load socket.io
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
//config the env PORT variable
const port = process.env.PORT || 3000;
//import generateMessage
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString}  = require('./utils/validation')
//configure our express application
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

//config express static middleware
app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User connected.');

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('join', (params , callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
        callback('Name and room name are required.');
    }

    callback();
  });




  socket.on('createMessage',(message,callback) => {
    //var createdAt = new Date().toString();
    //console.log('createMessageEvent : ', message , createdAt);
    console.log('createMessage:' ,message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  //geolocation
  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude , coords.longitude));
  });

  socket.on('disconnect',() =>{
    console.log('User Disconnected');
  });
});

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
