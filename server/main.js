/*
    Uses express, dbcon for database connection, body parser to parse form data
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use('/static', express.static('public'));
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/users', require('./users.js'));
app.use('/parts', require('./parts.js'));
app.use('/builds', require('./builds.js'));
app.use('/ratings', require('./ratings.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
