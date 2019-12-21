'use strict';

const cluster = require('cluster');
const http = require('http');
const { pid } = process;

const PORT = 2000;

if (cluster.isMaster) {
  const count = 3;
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const tid = cluster.worker.id;

  console.log(`Process: ${pid}, port: ${PORT}`);

  http.createServer((req, res) => {
    const { method, url } = req;
    const result = `Processed by ${pid}/${tid} ${method} ${url}`;
    res.end(result);
  }).listen(PORT);
}
