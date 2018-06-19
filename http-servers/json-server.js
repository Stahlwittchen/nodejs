const http = require('http');
const port = 3003;
const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};

http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(product))
}).listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Server is listening on ${port}!`);
});