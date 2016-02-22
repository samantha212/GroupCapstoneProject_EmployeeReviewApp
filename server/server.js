var express = require("express");
var path = require("path");
var app = express();

app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/', function(request,response){
  response.sendFile(path.join(__dirname, '/public/views/index.html'));
});

// temporary "Catch All" for reloading angular routes
app.get('/*', function(request, response){
    response.sendFile(path.join(__dirname, '/public/views/index.html'));
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Listening on port: ", port);
});
