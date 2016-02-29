var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regiscorp';

router.post('/', function(request, response){
  var empId = [];

  pg.connect(connectionString, function(err, client, done){
    var signData = {isLeader: request.body.isLeader, regisId: request.body.regisId, signature: request.body.EmployeeSignature};

    var findEmpId = client.query('SELECT "Id" FROM "employeeData" WHERE "RegisId" = $1', [employeeUpdate.regisId]);

    findEmpId.on('row', function(row){
      empId.push(row);
    });

    findEmpId.on('end', function(){
      var query
      if(signData.isLeader == true){
        query = client.query('UPDATE "employeeData" SET "LeaderSignature" = $1, WHERE "Id" = $2', [signData.signature, empId[0].Id]);
      }else{
          query = client.query('UPDATE "employeeData" SET "EmployeeSignature" = $1, WHERE "Id" = $2', [signData.signature, empId[0].Id]);
      }
      client.end();
      //might need to send a response
    });

    var updateSignature = client.query('');

    if(err){response.send('error on server')};
  });
});

module.exports = router;
