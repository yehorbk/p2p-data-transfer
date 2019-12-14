'use strict';

const net = require('net');
const Config = require('./config');

const server = net.createServer((connection) => { 
    console.log('client connected');
    
    connection.on('end', function() {
       console.log('client disconnected');
    });
    connection.write('Hello World!\r\n');
    connection.pipe(connection);
 });
 server.listen(Config.PORT, function() { 
    console.log('');
 });