const { Pool, Client } = require('pg');
const pool = new Pool({user: 'postgres', host: 'localhost', database: 'todolist', password: '123', port: 5432 });
const MongoClient =  require('mongodb').MongoClient;


module.exports = {
    postgre: pool,
    mongo: function(fn){
        MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true}, fn);
    }
};
