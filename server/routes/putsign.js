var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regis-reviews';

router.post('/', function(request, response){
  var empId = [];

  pg.connect(connectionString, function(err, client, done){
    var signData = {isLeader: request.body.isLeader, regisId: request.body.regisId, EmployeeSignature: request.body.EmployeeSignature};

    var findEmpId = client.query('SELECT "Id" FROM "employeeData" WHERE "RegisId" = $1', [signData.regisId]);

    findEmpId.on('row', function(row){
      empId.push(row);
    });

    findEmpId.on('end', function(){
      var query
      if(signData.isLeader == true){
        query = client.query('UPDATE "employeeData" SET "LeaderSignature" = $1 WHERE "Id" = $2', [signData.EmployeeSignature, empId[0].Id]);
      }else{
        query = client.query('UPDATE "employeeData" SET "EmployeeSignature" = $1 WHERE "Id" = $2', [signData.EmployeeSignature, empId[0].Id]);
      }

      query.on('end', function(){
        var compareData = [];
        var checkIfDone = client.query('SELECT "EmployeeSignature", "LeaderSignature" FROM "employeeData" WHERE "Id" = $1', [empId[0].Id]);

        checkIfDone.on('row', function(row){
            compareData.push(row);
        });

        checkIfDone.on('end', function(){
          if(compareData[0].EmployeeSignature && compareData[0].LeaderSignature != null){
            response.send(true);
            var updateStage =client.query('UPDATE "employeeData" SET "ReviewStatus" = 7 WHERE "Id" = $1', [empId[0].Id]);
          }else{
            response.send(false);
            client.end();
          }

          updateStage.on('end', function(){
            client.end();
          });
        });
      });
    });

    if(err){response.send('error on server')};
  });
});

module.exports = router;
