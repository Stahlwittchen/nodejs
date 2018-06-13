const http = require('http');
const port = 3003;
var fs = require("fs");
const path = require('path');

http.createServer(function(request, response){
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    var filePath = path.join('http-servers','index.html');
    fs.readFile(filePath, function (error, data) {
        console.log(data.toString());
        if (error) {
            response.statusCode = 404;
            response.end("Ресурс не найден")
        } else {
            response.end(data);
        }
        return;
    });
}).listen(port);