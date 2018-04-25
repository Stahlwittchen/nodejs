class User {
    constructor(name) {
        this.name = name;
    }
    hello(){
        console.log(`hello, i am ${this.name}`)
    }
}
//common js
//exports.default = User;
module.exports = User;

//ES modules
//exports default User;