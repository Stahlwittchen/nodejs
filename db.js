let db;

module.exports.connect = () => {
    db = require('./db.json')
};

module.exports.getName = () => {
    if(!db.name){
        throw new Error('No name')
    }

    return db.name;
}