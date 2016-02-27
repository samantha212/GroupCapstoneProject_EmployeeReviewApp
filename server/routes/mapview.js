var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regiscorp';

router.post('/', function(request, response){
  var reviewMapId = request.body.Id;

  var results = [];
  pg.connect(connectionString, function(err, client, done){
    //*** Add an ORDER BY to this query to enure that the sections/subsections come back in proper order.
    var query = client.query('SELECT * FROM "Subsection" WHERE "EmployeeId" = $1', [reviewMapId]);

    query.on('row', function(row){
      var mapObject = {SectionId: row.SectionId, SubsectionId: row.SubsectionId, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
      results.push(mapObject);
    });
    query.on('end', function(){
      response.send(results);
    });
  });
});

module.exports = router;
