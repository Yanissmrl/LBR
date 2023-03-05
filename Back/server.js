const http = require('http');
const app = require('./src/app');
const server = http.createServer(app);
const port = 4040;
const database = require('./src/database');
const User = require('./model/user');
const News = require('./model/news');
app.set('port', port);
server.listen(port);

server.on('listening', () => {
  console.log(`Server web lancé à l'adresse : http://localhost:${port}`);
});

server.on('error', e => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Error : address http://localhost:${port} already in use`);
    process.exit();
  }
});