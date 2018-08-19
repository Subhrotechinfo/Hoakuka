var socket = io();
socket.on('connect',function ()  {
  console.log('Connected to server');

  //emitting data from client to the server
// socket.emit('createEmail',{
//       to:'subhrofk@gmail.com',
//       text:'Hey. This is Subhro.'
//   });
  socket.emit('createMessage',{
        from:'jeddy',
        text:'Hi Subhro its me Jeddy !! Whats app bro'
  });
});


socket.on('disconnect' ,function () {
    console.log('Disconnected from server');
});
//listening the data emitted from server
// socket.on('newEmail',function (email) {
//   console.log('New Email',email);
// });


socket.on('newMessage',function(message){
  console.log('newMessageEvent: ',message);
});
