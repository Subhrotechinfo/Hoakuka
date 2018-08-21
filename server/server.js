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
//load the users
const {Users} =  require('./utils/users');

//configure our express application
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
//make an instance
var users = new Users();

//config express static middleware
app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User connected.');

  socket.on('join', (params , callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    //once the user join the chat room add him to the list
    users.addUser(socket.id, params.name,params.room);
    //leave a room socket.leave()
    //io.emit() -> io.to('Developers').emit
    //socket.broadcast.emit --> socket.broadcast.to('Developers').emit()
    //socket.emit
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage',(message,callback) => {
    //console.log('createMessage:' ,message);
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
    }
    callback();
  });

  //geolocation
  socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);
    if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude , coords.longitude));
    }

  });

  socket.on('disconnect',() =>{
    //console.log('User Disconnected');
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left` ));

    }
  });
});

server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
