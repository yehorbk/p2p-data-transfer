const Crypto = require('../environment/crypto');

const messege = Crypto.encode('awdadjfjnfdsjyg')
console.log(messege);
console.log(Crypto.decode(messege));
