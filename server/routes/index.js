var express = require('express');
var router = express.Router();
var path = require('path');
var token = require('../routes/tokencall');
var employeeReview = require('../routes/entireemployeereview.js');
var mapView = require('../routes/mapview.js');
var updateData = require('../routes/putsection.js');

router.use('/', express.static(path.join(__dirname, '../public')));
router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/token', token);
router.use('/employeeData', employeeReview);
router.use('/getmapview', mapView)
router.use('/updateData', updateData);

module.exports = router;
