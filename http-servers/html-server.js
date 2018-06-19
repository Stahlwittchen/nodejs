const http = require('http');
const port = 3003;
const fs = require("fs");
const path = require('path');
const through = require('through2');
const text = 'hello html world!'

http.createServer(function(request, response){
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    var filePath = path.join('http-servers','index.html');

    fs.createReadStream(filePath)
        .pipe(through(function (chunk) {
            this.push(chunk.toString().replace(/{message}/, text))
        }))
        .pipe(response);
}).listen(port, (error) => {
    if (error) {
        throw error;
    }
});