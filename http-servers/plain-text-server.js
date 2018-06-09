require(http)
    .createServer()
    .on('request', (req, res) => {
        const { url, method } = req;
        res.writeHead(200,{
            'Content-Type': 'text/html'
        });
        res.end('<h1>Hello World</h1>')
    })
    .listen(3003);