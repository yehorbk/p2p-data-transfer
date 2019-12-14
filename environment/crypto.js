const NodeRSA = require('node-rsa');

const key = new NodeRSA({b:512});

const encode = (data) => {
    return key.encrypt(data, 'base64');
}

const decode = (data) => {
    return key.decrypt(data, 'utf-8');
}

module.exports.encode = encode;
module.exports.decode = decode;