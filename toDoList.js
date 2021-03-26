var path = require('path'),
    fs = require('fs'),
    db = require('./db');

function sendErr(res, err){
    if(typeof(err) == 'object') res.send(err);
    else res.send('ERROR - ' + err);
}

function toDoView(req, res){
    db.postgre.query('SELECT * FROM list', function(_err, _res) {
        res.render(path.join(__dirname, 'views', 'index'), { items: _res.rows }, function(err, str){
            (err && err == null) ? res.send('ERROR') :  res.send(str);
        });
    });
}

var toDoService = {
    remove: function(data, res){
        db.postgre.query("DELETE FROM list WHERE id = " + data.id, function(_err, _res) {
            db.mongo(function(err, client){client.db('todolist').collection('list').deleteOne({sqlID: parseInt(data.id)});});
            if(_err) res.send({message: 'error'});
            else res.send({message: 'success'});
        });
    },
    update: function(data, res){
        db.postgre.query("UPDATE list SET done = '" + data.done + "' WHERE id = " + data.id, function(_err, _res) {
            db.mongo(function(err, client){client.db('todolist').collection('list').updateOne({sqlID: parseInt(data.id)}, {$set: { done: data.done }});});
            if(_err) res.send({message: 'error'});
            else res.send({message: 'success'});
        });
    },
    add: function(data, res){
        db.postgre.query("INSERT INTO list(text,done) VALUES ('" + data.text + "', false) RETURNING id", function(_err, _res) {
            if(_err) res.send({message: 'error'});
            else {
                db.mongo(function(err, client){ client.db('todolist').collection('list').insertOne({text: data.text, sqlID: _res.rows[0].id, done: false}); });
                res.send({message: 'success'});
            }
        });
    },
    view: function(data, res){
        db.postgre.query('SELECT * FROM list', function(_err, _res) {
            if(_err) res.send({message: 'error'});
            else res.send({message: 'success', data: _res.rows});
        });
    }
}


module.exports = {
    view: toDoView,
    service: function(req, res){
        if(typeof(toDoService[req.params.service]) == 'function') toDoService[req.params.service](req.body, res);
        else sendErr(res, {error: 'no service'})
    }
};
