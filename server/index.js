const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
port = 8080;

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    let name = socket.id.substr(0,2);

    socket.on('send-message', (message, room) => {
        console.log(message);
        if (room === '') {
            io.emit('receive-message', name, message);
        } else {
            socket.nsp.to(room).emit('receive-message', name, message);
        }
    });
    socket.on('join-room', (room) => {
        console.log(`${socket.id} joined ${room}`);
        socket.join(room);
        socket.nsp.to(room).emit('receive-message', name, `joined ${room} room`);
    });
});

http.listen(port, () => console.log(`Listening on http://localhost:${port}`));
