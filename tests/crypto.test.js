const Crypto = require('../environment/crypto');

const messege = Crypto.encode(1234556);



console.log(messege);
console.log(Crypto.decode(messege));
console.log(Crypto.encode('String'));
console.log(Crypto.encode('St green'));
console.log(Crypto.encode('Not industrial'));
console.log(Crypto.encode('molotov'));



