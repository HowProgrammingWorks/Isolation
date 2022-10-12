'use strict';

const cp = require('node:child_process');
const { pid } = process;

const threads = require('node:worker_threads');
const tid = threads.threadId;

console.log({ tid });

const count = 5;
console.log(`Master pid: ${pid}, Starting ${count} forks`);

for (let i = 0; i < count; i++) {
  cp.fork('./process.js', [i]);
}
