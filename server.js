'use strict';

const net = require('net');
const Config = require('./environment/config');
const Logger = require('./environment/logger');

const HOST = process.argv[2];

if (HOST) {
    connectToServer(HOST)
} else {
    startServer();
}

function connectToServer(host) {
    Logger.log(host);
    net.connect({host: host, port: Config.PORT}, () => {
        Logger.log('Connected!');
    });
}

function startServer() {
    const server = net.createServer((connection) => {
        Logger.log('User connected!');
    
        connection.write('Hello World!\r\n');
        connection.pipe(connection);
    
    });
    
    server.listen(Config.PORT, function () {
        Logger.log('Server started on: ' + Config.PORT);
    });
}



/*

   connection.on('end', function() {
      console.log('client disconnected');
   });

*/