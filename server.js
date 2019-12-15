'use strict';

const net = require('net');
const Config = require('./environment/config');
const Logger = require('./environment/logger');
const Crypto = require('./environment/crypto');
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
    socket.on('data', (data) => {
        // console.log("1" + data.toString());
        // const message = Crypto.decode(data.toString());
        // console.log(message);
        console.log(data);
    })
}

function startServer() {
    const server = net.createServer((connection) => {
        Logger.log('User connected!');
        addConnection(connection);
        bindConnectionMethods(connection);
    });
    server.listen(Config.PORT, function () {
        Logger.log('Server started on: ' + Config.PORT);
        connectToServer();
    });
}

function addConnection(connection) {
    connections.push(connection);
}

function bindConnectionMethods(connection) {
    connection.on('data', (data) => {
        // const message = Crypto.encode(data.toString());
        // console.log("2" + data.toString());
        // console.log(message)
        for (let item of connections) {
            if (item != connection) { 
                // item.write(message);
                item.write(data);
            }
        }
    });
    connection.on('end', (connection) => { // It cause exception!
        Logger.log('User disconnected: ' + connections.indexOf(connection));
    });
    connection.pipe(connection);
} 

function listenToMessage() {
    readline.question('', (data) => {
        sendMessage(data);
        readline.close();
        listenToMessage();
    });
}

function sendMessage(message) {
    socket.write(message)
}
