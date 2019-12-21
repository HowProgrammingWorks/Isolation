'use strict';

const threads = require('worker_threads');
const { pid } = process;
const tid = threads.threadId;

threads.parentPort.on('message', ({ id, method, url }) => {
  const result = `Processed by ${pid}/${tid} ${method} ${url}`;
  threads.parentPort.postMessage({ id, result });
});
