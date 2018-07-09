const mongo = require('./mongo');
//const app = require('./app');
const port = 3003;
mongo.listen(port, () => console.log(`App listening on port ${port}!`));