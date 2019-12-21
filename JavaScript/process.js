'use strict';

const http = require('http');
const threads = require('worker_threads');
const { Worker } = threads;
const { pid } = process;

const BASE_PORT = 2000;

const id = parseInt(process.argv[2], 10);
const port = BASE_PORT + id - 1;

const workers = [];

const logs = [`  Process: ${pid}, port: ${port}`];
for (let i = 0; i < 3; i++) {
  const worker = new Worker('./thread.js');
  logs.push(`    Thread: ${pid}/${worker.threadId}`);
  workers.push(worker);
}
console.log(logs.join('\n'));

http.createServer((req, res) => {
  res.end(`Process: ${pid}`);
}).listen(port);
