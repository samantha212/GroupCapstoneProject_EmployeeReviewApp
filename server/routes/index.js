var express = require('express');
var path = require('path');
var npmRequest = require('request');
var router = express.Router();


router.use('/', express.static(path.join(__dirname, '../public')));
router.get('/', function(request,response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/getUserData', function(request, response){
  var userId = request.body.userId;
  npmRequest('http://dev-mediation.regiscorpqa.com/HRReview/api/reviews/'+userId, function(err, res, reqBody){
    if(!err && res.statusCode == 200){
      response.send(reqBody);
    };
  });
});

module.exports = router;
