class Product {
    constructor(productName) {
        this.productName = productName;
    }
    show(){
        console.log(`this is ${this.productName}`)
    }
}

//common js
module.exports = Product;

//ES modules
//exports default Product;
