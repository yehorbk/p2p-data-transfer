'use strict';

const net = require('net');
const Config = require('./environment/config');
const Logger = require('./environment/logger');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const HOST = process.argv[2];
let socket = null;
let connections = [];

if (HOST) {
    connectToServer(HOST)
} else {
    startServer();
}

function connectToServer(host = '127.0.0.1') {
    socket = net.connect({ host: host, port: Config.PORT }, () => {
        Logger.log('Connected!');
        listenToMessage();
    });
}

function startServer() {
    const server = net.createServer((connection) => {
        Logger.log('User connected!');
        addConnection(connection);
        connection.pipe(connection);

        connection.on('data', (data) => {
            console.log(data);
            for (let item of connections) {
                item.write(data);
            }
        });

    });
    server.listen(Config.PORT, function () {
        Logger.log('Server started on: ' + Config.PORT);
        connectToServer();
    });
    server.on('end', (connection) => {
        Logger.log('User disconnected: ' + connection);
    });
}

function addConnection(connection) {
    connections.push(connection);
}

function listenToMessage() {
    readline.question('Message: ', (data) => {
        sendMessage(data);
        readline.close();
    });
}

function sendMessage(message) {
    socket.write(message)
}


/*

   connection.on('end', function() {
      console.log('client disconnected');
   });

*/