const fs = require('fs'); 

const log = (data) => {
    console.log(data);
    logToFile(data);
}

const logToFile = (data) => {
    data += '\n';
    fs.appendFile('../logs/server.log', data, (error) => {
        if (error) {
            throw new Error(error);
        }
    })

}

module.exports.log = log;