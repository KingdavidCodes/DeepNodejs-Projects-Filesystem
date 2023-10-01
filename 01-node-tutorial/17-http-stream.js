const http = require('http');
const fs = require('fs');


http
    .createServer((res, res) => {
        const text = fs.readFileSync('./content/big.txt', 'utf-8');
        res.end(text);
    })
    .listen(5000);