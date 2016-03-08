var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regis-reviews';

router.post('/', function(request, response){
  var regisId = request.body.regisId;
  var employeeBaseData = [];

  pg.connect(connectionString, function(err, client, done){
    var query;
    query = client.query('SELECT * FROM "employeeData" WHERE "RegisId" = $1', [regisId]);

    query.on('row', function(row){
      employeeBaseData.push(row);
    });

    query.on('end', function(){
      var clientReviewQuery;
      var employeeId = employeeBaseData[0].Id;
      var employeeReviewData = [];
      clientReviewQuery = client.query('SELECT * FROM "Subsection" WHERE "EmployeeId" = $1 ORDER BY "SectionId" ASC, "SubsectionId"', [employeeId]);

      clientReviewQuery.on('row', function(row){
        var employeeObject = {};

        if(employeeBaseData[0].ReviewType == 'SS'){
          if(row.SectionId == 2){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, Goal: row.Goal, EmployeeGoalRating: row.EmployeeGoalRating, EmployeeResponse: row.EmployeeResponse, LeaderGoalRating: row.LeaderGoalRating, LeaderResponse: row.LeaderResponse, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
            employeeReviewData.push(employeeObject);
          }else if(row.SectionId == 4){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, EmployeeHairRating: row.EmployeeHairRating, LeaderHairRating: row.LeaderHairRating, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
            employeeReviewData.push(employeeObject);
          }else if(row.SectionId == 6){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, EmployeeResponse: row.EmployeeResponse, LeaderResponse: row.LeaderResponse, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted, EmployeeFinalRating: row.EmployeeFinalRating, LeaderFinalRating: row.LeaderFinalRating, OverallRating: row.OverallRating};
            employeeReviewData.push(employeeObject);
          }else{
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, EmployeeResponse: row.EmployeeResponse, LeaderResponse: row.LeaderResponse, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
            employeeReviewData.push(employeeObject);
          }
        }else{
          if(row.SectionId == 1){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted, C_Actual: row.C_Actual, SS_Actual: row.SS_Actual, SGC_Actual: row.SGC_Actual, C_Rating: row.C_Rating, C_Target: row.C_Target, RS_Actual: row.RS_Actual, RS_Target: row.RS_Target, SGC_Rating: row.SGC_Rating, SGC_Target: row.SGC_Target, SS_Target: row.SS_Target, TS_Actual: row.TS_Actual, TS_Rating: row.TS_Rating, TS_Target: row.TS_Target, OverallRating: row.OverallRating};
            employeeReviewData.push(employeeObject);
          }else if(row.SectionId == 2){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, Goal: row.Goal, EmployeeGoalRating: row.EmployeeGoalRating, EmployeeResponse: row.EmployeeResponse, LeaderGoalRating: row.LeaderGoalRating, LeaderResponse: row.LeaderResponse, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
            employeeReviewData.push(employeeObject);
          }else if(row.SectionId == 4){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, EmployeeHairRating: row.EmployeeHairRating, LeaderHairRating: row.LeaderHairRating, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
            employeeReviewData.push(employeeObject);
          }else if(row.SectionId == 6){
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, EmployeeResponse: row.EmployeeResponse, LeaderResponse: row.LeaderResponse, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted, EmployeeFinalRating: row.EmployeeFinalRating, LeaderFinalRating: row.LeaderFinalRating, OverallRating: row.OverallRating};
            employeeReviewData.push(employeeObject);
          }else{
            employeeObject = {Id: row.Id, SectionId: row.SectionId, SubsectionId: row.SubsectionId, EmployeeResponse: row.EmployeeResponse, LeaderResponse: row.LeaderResponse, isCompleted: row.isCompleted, isLeaderCompleted: row.isLeaderCompleted};
            employeeReviewData.push(employeeObject);
          }
        }
      });

      clientReviewQuery.on('end', function(){
        client.end();
        var sendBaseAndReview = [];
        sendBaseAndReview.push(employeeBaseData);
        sendBaseAndReview.push(employeeReviewData);
        response.send(sendBaseAndReview);
      });
    });

    if(err){
      response.send('error on server side');
    }
  });
});

router.post('/leaderReviews', function(request, response){
  var regisId = request.body.regisId;
  pg.connect(connectionString, function(err, client, done){
    var findReviewsId;
    var reviewResults = [];

    findReviewsId = client.query('SELECT * FROM "employeeData" WHERE "LeaderRegisId" = $1 ORDER BY "Id" ASC', [regisId]);
    findReviewsId.on('row', function(row){
      reviewResults.push(row);
    });

    findReviewsId.on('end', function(){
      response.send(reviewResults);
      client.end();
    });
    if(err){response.send('server leaderreview error')};
  });
});

module.exports = router;
