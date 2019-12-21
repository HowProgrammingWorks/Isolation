'use strict';

const http = require('http');
const { pid } = process;
const tid = 1;

const PORT = 2000;

http.createServer((req, res) => {
  const { method, url } = req;
  const result = `Processed by ${pid}/${tid} ${method} ${url}`;
  res.end(result);
}).listen(PORT);
