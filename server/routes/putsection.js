var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regiscorp';

var empId = [];
router.post('/', function(request, response){
  var employeeUpdate = {regisId: request.body.regisId, SectionId: request.body.SectionId, SubsectionId: request.body.SubsectionId, data: request.body.data};
  console.log(employeeUpdate.data.Goal);

  pg.connect(connectionString, function(err, client, done){
    var findEmpId = client.query('SELECT "Id" FROM "employeeData" WHERE "RegisId" = $1', [employeeUpdate.regisId]);

    findEmpId.on('row', function(row){
      empId.push(row);
    });

    findEmpId.on('end', function(){
      console.log(empId[0].Id);
      console.log(employeeUpdate.regisId);
      console.log(employeeUpdate.SectionId);
      console.log(employeeUpdate.SubsectionId);
      console.log(employeeUpdate.data.Goal);
      var query = client.query('UPDATE "Subsection" SET "Goal" = $1, "EmployeeGoalRating" = $2, "EmployeeResponse" = $3, "LeaderGoalRating" = $4, "LeaderResponse" = $5, "isCompleted" = $6, "isLeaderCompleted" = $7, "EmployeeHairRating" = $8, "LeaderHairRating" = $9, "EmployeeFinalRating" = $10, "LeaderFinalRating" = $11, "SS_Actual" = $12, "SS_Target" = $13, "RS_Actual" = $14, "RS_Target" = $15, "TS_Actual" = $16, "TS_Target" = $17, "TS_Rating" = $18, "C_Actual" = $19, "C_Target" = $20, "C_Rating" = $21, "SGC_Actual" = $22, "SGC_Target" = $23, "SGC_Rating" = $24, "OverallRating" = $25 WHERE "EmployeeId" = $26 AND "SectionId" = $27 AND "SubsectionId" = $28', [employeeUpdate.data.Goal, employeeUpdate.data.EmployeeGoalRating, employeeUpdate.data.EmployeeResponse, employeeUpdate.data.LeaderGoalRating, employeeUpdate.data.LeaderResponse, employeeUpdate.data.isCompleted, employeeUpdate.data.isLeaderCompleted, employeeUpdate.data.EmployeeHairRating, employeeUpdate.data.LeaderHairRating, employeeUpdate.data.EmployeeFinalRating, employeeUpdate.data.LeaderFinalRating, employeeUpdate.data.SS_Actual, employeeUpdate.data.SS_Target, employeeUpdate.data.RS_Actual, employeeUpdate.data.RS_Target, employeeUpdate.data.TS_Actual, employeeUpdate.data.TS_Target, employeeUpdate.data.TS_Rating, employeeUpdate.data.C_Actual, employeeUpdate.data.C_Target, employeeUpdate.data.C_Rating, employeeUpdate.data.SGC_Actual, employeeUpdate.data.SGC_Target, employeeUpdate.data.SGC_Rating, employeeUpdate.data.OverallRating, empId[0].Id, employeeUpdate.SectionId, employeeUpdate.SubsectionId]);

      query.on('end', function(){
        response.sendStatus(200);
        client.end();
      });
    });
    if(err){
      console.log(err);
    }
  });
});

module.exports = router;
