const mongo = require('./mongo');
//const app = require('./app');
const port = 27017;
mongo.listen(port, () => console.log(`App listening on port ${port}!`));