var express = require("express");
var path = require("path");
var index = require("./routes/index");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use("/", index);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Listening on port: ", port);
});
