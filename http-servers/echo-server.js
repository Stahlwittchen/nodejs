const http = require('http');
const port = 3003;

http.createServer((request, response) => request.pipe(response))
    .listen(port, (error) => {
        if (error) {
            throw error;
        }
        console.log(`Server is listening on ${port}!`);
    });