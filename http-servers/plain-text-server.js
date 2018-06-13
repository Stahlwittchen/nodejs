const http = require('http');
const port = 3003;

http.createServer(function(request, response){
    response.setHeader("Content-Type", "text/plain");
    response.write("hello plain world");
    response.end();
}).listen(port);