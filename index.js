const db = require('./config');
db.connect();
console.log(db.getName())

require('./models/models')