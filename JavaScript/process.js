'use strict';

const http = require('http');
const threads = require('worker_threads');
const { Worker } = threads;
const { pid } = process;

const BASE_PORT = 2000;

const processId = parseInt(process.argv[2], 10);
const port = BASE_PORT + processId - 1;

const count = 3;
const workers = [];
let next = 0;
let reqId = 0;
const requests = new Map();

const logs = [`  Process: ${pid}, port: ${port}`];
for (let i = 0; i < count; i++) {
  const worker = new Worker('./thread.js');
  const tid = worker.threadId;
  logs.push(`    Thread: ${pid}/${tid}`);
  workers.push(worker);
  worker.on('message', ({ id, result }) => {
    const context = requests.get(id);
    requests.delete(id);
    const { res } = context;
    res.end(result);
  });
}
console.log(logs.join('\n'));

http.createServer((req, res) => {
  const id = reqId++;
  const { method, url } = req;
  const worker = workers[next++];
  if (next >= count) next = 0;
  worker.postMessage({ id, method, url });
  const context = { req, res, worker };
  requests.set(id, context);
}).listen(port);
