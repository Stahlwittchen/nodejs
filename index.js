const db = require('./db');
db.connect();
console.log(db.getName())

require('./app/app')