var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var pg = require('pg');
var index = require('./routes/index');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regis-reviews';

app.use('/', index);

app.get('/*', function(request, response){
	response.sendFile(path.join(__dirname, '../server/public/views/index.html'));
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
  console.log('running on port: ', app.get('port'));
});
