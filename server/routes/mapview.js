var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regis-reviews';

router.post('/', function(request, response){
  var regisId = request.body.regisId;

  var results = [];
  var empId = [];

  pg.connect(connectionString, function(err, client, done){
    var findEmpId = client.query('SELECT "Id" FROM "employeeData" WHERE "RegisId" = $1', [regisId]);

    findEmpId.on('row', function(row){
      empId.push(row);
    });

    findEmpId.on('end', function(){
      var query = client.query('SELECT * FROM "Subsection" WHERE "EmployeeId" = $1 ORDER BY "SectionId" ASC, "SubsectionId"', [empId[0].Id]);

      query.on('row', function(row){
        var mapObject = {SectionId: row.SectionId, SubsectionId: row.SubsectionId, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
        results.push(mapObject);
      });
      query.on('end', function(){
        client.end();
        response.send(results);
      });
    });
  });

});

module.exports = router;
