'use strict';

const cp = require('child_process');
const { pid } = process;

const count = 5;
console.log(`Master pid: ${pid}, Starting ${count} forks`);

for (let i = 0; i < count; i++) {
  cp.fork('./process.js', [i]);
}
