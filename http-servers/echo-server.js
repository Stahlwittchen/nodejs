var express = require('express');
var app = express();

app.get("/api/products", function(request, response){

    response.send("<h1>Return ALL products</h1>");
});
app.get("/api/products/:id", function(request, response){

    response.send("<h1>Return SINGLE product</h1>");
});
app.get("/api/products/:id/reviews", function(request, response){

    response.send("<h1>Return ALL reviews for a single product</h1>");
});
app.post("/api/products", function(request, response){

    response.send("<h1>Add NEW product and return it</h1>");
});
app.get("/api/users", function(request, response){

    response.send("<h1>Return ALL users</h1>");
});

app.listen(3003, function () {
    console.log('Example app listening on port 3003!');
});