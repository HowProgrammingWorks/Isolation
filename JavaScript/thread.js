'use strict';

const threads = require('worker_threads');

threads.parentPort.postMessage('Message from Worker to Master');

threads.parentPort.on('message', data => {
  console.dir({ data });
});
