const mongoose = require('mongoose');
const app = require('./app');
const port = 3003;
const url = 'mongodb://localhost:27017/citiesdb';
mongoose.connect(url);
app.listen(port, () => console.log(`App listening on port ${port}!`));