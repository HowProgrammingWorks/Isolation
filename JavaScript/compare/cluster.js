'use strict';

const cluster = require('node:cluster');
const http = require('node:http');
const { pid } = process;

const PORT = 2000;

if (cluster.isPrimary) {
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
