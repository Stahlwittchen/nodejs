let config;

module.exports.connect = () => {
    config = require('./config.json')
};

module.exports.getName = () => {
    if(!config.name){
        throw new Error('No name')
    }

    return config.name;
}