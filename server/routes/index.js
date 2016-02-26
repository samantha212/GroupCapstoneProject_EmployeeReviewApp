var express = require('express');
var router = express.Router();
var path = require('path');
var token = require('../routes/tokencall');

router.use('/', express.static(path.join(__dirname, '../public')));
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//link the token module
router.use('/token', token);

module.exports = router;
