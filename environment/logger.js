const fs = require('fs');

const log = (data) => {
    data = getLogTime() + data;
    console.log(data);
    logToFile(data);
}

const logToFile = (data) => {
    data += '\n';
    fs.appendFile('./logs/server.log', data, (error) => {
        if (error) {
            throw new Error(error);
        }
    })
}

const getLogTime = () => {
    const date = new Date();
    return '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] - ';
}

module.exports.log = log;