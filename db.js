var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
db = low(adapter);
db.defaults({ users: [], sessions: [] }).write();
db.get({ products: [] }).write();
var shortid = require('shortid');


module.exports = db;