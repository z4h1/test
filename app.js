var express = require('express'),
    session = require('express-session'),
    app = express(),
    path = require('path'),
    url = require('url'),
    http = require('http'),
    toDoList = require('./toDoList'),
    bodyParser = require('body-parser'),
    db = require('./db'),
    appPort = 55555,
    server;


function serverInit(){
    console.log('app is up :) ' + new Date());
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: '!@$@!', resave: false, saveUninitialized: true}));
app.use('/static', express.static(path.join(__dirname , 'static')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.post('/toDoList/:service', toDoList.service);
app.get('/', toDoList.view);
app.get('*', function(req, res) {res.redirect('/');});

server = http.createServer(app).listen(appPort, 'localhost', function(err) {
    serverInit();
});