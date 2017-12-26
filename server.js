const server = require('http').createServer();
const io = require('socket.io')(server);

const connections = [];

io.on('connection', (socket) => {
    connections.push(socket);

    socket.on('addMessage', data => {
        connections.forEach(connectedSocket => {
            connectedSocket.emit('updateMessages', data);
        });
    });

    socket.on('disconnect', () => {
        const index = connections.indexOf(socket);
        connections.splice(index, 1);
    });
});

const port = 9000;
server.listen(port);
console.log('listening on port ', port);