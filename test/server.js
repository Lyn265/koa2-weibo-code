const request = require('supertest');
const server = require('../src/app').callback();
require('mysql2/node_modules/iconv-lite').encodingExists('foo');

module.exports=request(server)


