const express = require('express');
const app = express();
const PORT = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/home.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('connected', 'a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnect');
        socket.broadcast.emit('disconnected', 'a user disconnected');
    });
});

http.listen(3000, () => {
    console.log(`listening on port ${PORT}`);
});

