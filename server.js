const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.emit('message', 'Welcome to Friendle');

    // Send message when any user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Send message when any user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for chat messages

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`) );