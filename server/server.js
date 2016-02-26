var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var pg = require('pg');
var index = require('./routes/index');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regiscorp';

app.use('/', index);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('running on port: ', app.get('port'));
});
