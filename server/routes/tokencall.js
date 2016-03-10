var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

router.get('/1', function(request, response){
  var sendToken = {regisId: 'JASTA1', token: 'dnPjjnGkmaX8qOJYs1Q7nvzYCnpeNKE72gndZBwfGgyCFvcW0Z8XrDGSQ/LF4MRgeq5Hm3oNXdw8Xw1y2KnAaqed5xKnMjQLkWPTFeqJOho='};
  response.send(sendToken);
});

router.get('/2', function(request, response){
  var sendToken = {regisId: 'BUTL02', token: 'dnPjjnGkmaX8qOJYs1Q7nvzYCnpeNKE72gndZBwfGgyCFvcW0Z8XrDGSQ/LF4MRgeq5Hm3oNXdw8Xw1y2KnAaqed5xKnMjQLkWPTFeqJOho='};
  response.send(sendToken);
});

router.get('/3', function(request, response){
  var sendToken = {regisId: 'MIMIL1', token: 'dnPjjnGkmaX8qOJYs1Q7nvzYCnpeNKE72gndZBwfGgyCFvcW0Z8XrDGSQ/LF4MRgeq5Hm3oNXdw8Xw1y2KnAaqed5xKnMjQLkWPTFeqJOho='};
  response.send(sendToken);
});

router.get('/4', function(request, response){
  var sendToken = {regisId: 'ANGEL5', token: 'dnPjjnGkmaX8qOJYs1Q7nvzYCnpeNKE72gndZBwfGgyCFvcW0Z8XrDGSQ/LF4MRgeq5Hm3oNXdw8Xw1y2KnAaqed5xKnMjQLkWPTFeqJOho='};
  response.send(sendToken);
});

router.get('/5', function(request, response){
  var sendToken = {regisId: 'KATV7', token: 'dnPjjnGkmaX8qOJYs1Q7nvzYCnpeNKE72gndZBwfGgyCFvcW0Z8XrDGSQ/LF4MRgeq5Hm3oNXdw8Xw1y2KnAaqed5xKnMjQLkWPTFeqJOho='};
  response.send(sendToken);
});

module.exports = router;
