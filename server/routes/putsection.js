var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regis-reviews';

var empId = [];
router.post('/', function(request, response){
  var employeeUpdate = {regisId: request.body.regisId, SectionId: request.body.SectionId, SubsectionId: request.body.SubsectionId, data: request.body.data};

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
      console.log(employeeUpdate.data);
      var query;
      if(!employeeUpdate.data.isCompleted && !employeeUpdate.data.isLeaderCompleted){
        query = client.query('UPDATE "Subsection" SET "Goal" = $1, "EmployeeGoalRating" = $2, "EmployeeResponse" = $3, "LeaderGoalRating" = $4, "LeaderResponse" = $5,"EmployeeHairRating" = $6, "LeaderHairRating" = $7, "EmployeeFinalRating" = $8, "LeaderFinalRating" = $9, "SS_Actual" = $10, "SS_Target" = $11, "RS_Actual" = $12, "RS_Target" = $13, "TS_Actual" = $14, "TS_Target" = $15, "TS_Rating" = $16, "C_Actual" = $17, "C_Target" = $18, "C_Rating" = $19, "SGC_Actual" = $20, "SGC_Target" = $21, "SGC_Rating" = $22, "OverallRating" = $23 WHERE "EmployeeId" = $24 AND "SectionId" = $25 AND "SubsectionId" = $26', [employeeUpdate.data.Goal, employeeUpdate.data.EmployeeGoalRating, employeeUpdate.data.EmployeeResponse, employeeUpdate.data.LeaderGoalRating, employeeUpdate.data.LeaderResponse,employeeUpdate.data.EmployeeHairRating, employeeUpdate.data.LeaderHairRating, employeeUpdate.data.EmployeeFinalRating, employeeUpdate.data.LeaderFinalRating, employeeUpdate.data.SS_Actual, employeeUpdate.data.SS_Target, employeeUpdate.data.RS_Actual, employeeUpdate.data.RS_Target, employeeUpdate.data.TS_Actual, employeeUpdate.data.TS_Target, employeeUpdate.data.TS_Rating, employeeUpdate.data.C_Actual, employeeUpdate.data.C_Target, employeeUpdate.data.C_Rating, employeeUpdate.data.SGC_Actual, employeeUpdate.data.SGC_Target, employeeUpdate.data.SGC_Rating, employeeUpdate.data.OverallRating, empId[0].Id, employeeUpdate.SectionId, employeeUpdate.SubsectionId]);
      }else{
          query = client.query('UPDATE "Subsection" SET "Goal" = $1, "EmployeeGoalRating" = $2, "EmployeeResponse" = $3, "LeaderGoalRating" = $4, "LeaderResponse" = $5, "isCompleted" = $6, "isLeaderCompleted" = $7, "EmployeeHairRating" = $8, "LeaderHairRating" = $9, "EmployeeFinalRating" = $10, "LeaderFinalRating" = $11, "SS_Actual" = $12, "SS_Target" = $13, "RS_Actual" = $14, "RS_Target" = $15, "TS_Actual" = $16, "TS_Target" = $17, "TS_Rating" = $18, "C_Actual" = $19, "C_Target" = $20, "C_Rating" = $21, "SGC_Actual" = $22, "SGC_Target" = $23, "SGC_Rating" = $24, "OverallRating" = $25 WHERE "EmployeeId" = $26 AND "SectionId" = $27 AND "SubsectionId" = $28', [employeeUpdate.data.Goal, employeeUpdate.data.EmployeeGoalRating, employeeUpdate.data.EmployeeResponse, employeeUpdate.data.LeaderGoalRating, employeeUpdate.data.LeaderResponse, employeeUpdate.data.isCompleted, employeeUpdate.data.isLeaderCompleted, employeeUpdate.data.EmployeeHairRating, employeeUpdate.data.LeaderHairRating, employeeUpdate.data.EmployeeFinalRating, employeeUpdate.data.LeaderFinalRating, employeeUpdate.data.SS_Actual, employeeUpdate.data.SS_Target, employeeUpdate.data.RS_Actual, employeeUpdate.data.RS_Target, employeeUpdate.data.TS_Actual, employeeUpdate.data.TS_Target, employeeUpdate.data.TS_Rating, employeeUpdate.data.C_Actual, employeeUpdate.data.C_Target, employeeUpdate.data.C_Rating, employeeUpdate.data.SGC_Actual, employeeUpdate.data.SGC_Target, employeeUpdate.data.SGC_Rating, employeeUpdate.data.OverallRating, empId[0].Id, employeeUpdate.SectionId, employeeUpdate.SubsectionId]);
      }

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

router.post('/changeState', function(request, response){
  console.log("changeState route hit.");
  var regisId = request.body.regisId;
  var state = request.body.ReviewStatus;

  pg.connect(connectionString, function(err, client, done){
    var query = client.query('UPDATE "employeeData" SET "ReviewStatus" = $1 WHERE "RegisId" = $2', [state, regisId]);

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    });
    if(err){response.send('error from server')};
  });
});

module.exports = router;
