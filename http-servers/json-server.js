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

http.createServer(function(request, response){
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.send(product);
    response.end();
}).listen(port);