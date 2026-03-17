const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'zsb-search.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        const ext = path.extname(filePath);
        const contentType = ext === '.html' ? 'text/html' : ext === '.json' ? 'application/json' : 'text/plain';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
