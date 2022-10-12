require('dotenv').config();
const debug = require('debug')('server');
const { createServer } = require('http');

const app = require('./app');

const port = process.env.PORT ?? 3000;

const server = createServer(app);

server.listen(port, () => {
  debug(`http://localhost:${port}`);
});
