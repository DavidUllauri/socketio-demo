const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});
port = 8080;

io.on("connection", (socket) => {
    console.log('A user connected');
    socket.on('message', (message) => {
        console.log(message);
        let name = socket.id.substr(0,2);
        io.emit('message', name, message);
    });
});

http.listen(port, () => console.log(`Listening on http://localhost:${port}`))