var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/regiscorp';

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
      clientReviewQuery = client.query('SELECT * FROM "Subsection" WHERE "EmployeeId" = $1', [employeeId]);

      clientReviewQuery.on('row', function(row){
        employeeReviewData.push(row);
      });

      clientReviewQuery.on('end', function(){
        client.end();
        var sendBaseAndReview = [];
        sendBaseAndReview.push(employeeBaseData);
        if(employeeBaseData[0].ReviewType == 'SS'){
          for(var i = 0; i < employeeReviewData.length; i++){
            delete employeeReviewData[i].C_Actual;
            delete employeeReviewData[i].SS_Actual;
            delete employeeReviewData[i].SGC_Actual;
            delete employeeReviewData[i].C_Rating;
            delete employeeReviewData[i].C_Target;
            delete employeeReviewData[i].RS_Actual;
            delete employeeReviewData[i].RS_Target;
            delete employeeReviewData[i].SGC_Rating;
            delete employeeReviewData[i].SGC_Target;
            delete employeeReviewData[i].SS_Target;
            delete employeeReviewData[i].TS_Actual;
            delete employeeReviewData[i].TS_Rating;
            delete employeeReviewData[i].TS_Target;

            if(employeeReviewData[i].SectionId != 2){
              delete employeeReviewData[i].EmployeeGoalRating;
              delete employeeReviewData[i].Goal;
              delete employeeReviewData[i].LeaderGoalRating;
            }
            if(employeeReviewData[i].SectionId != 6){
              delete employeeReviewData[i].OverallRating;
              delete employeeReviewData[i].EmployeeFinalRating;
              delete employeeReviewData[i].LeaderFinalRating;
            }
            if(employeeReviewData[i].Section != 4){
              delete employeeReviewData[i].EmployeeHairRating;
              delete employeeReviewData[i].LeaderHairRating;
            }
          }
        }else{
          for(var i = 0; i < employeeReviewData.length; i++){
            delete employeeReviewData[i].EmployeeGoalRating;
            delete employeeReviewData[i].LeaderGoalRating;
            delete employeeReviewData[i].Goal;
          }
        }
        sendBaseAndReview.push(employeeReviewData);
        response.send(sendBaseAndReview);
      });
    });

    if(err){
      response.send('error on server side');
    }
  });
});

//We adjusted this call to send back the employee info to the client as well as the subsection info.
router.post('/leaderReviews', function(request, response){
  var regisId = request.body.regisId;
  pg.connect(connectionString, function(err, client, done){
    var findReviewsId;
    var reviewerIds = [];
    var reviewResults = [];

    findReviewsId = client.query('SELECT * FROM "employeeData" WHERE "LeaderRegisId" = $1', [regisId]);
    findReviewsId.on('row', function(row){
      reviewResults.push(row);
      reviewerIds.push(row.Id);
    });

    findReviewsId.on('end', function(){
      var giveReviewsQuery;
      for(var i = 0; i < reviewerIds.length; i++){
        giveReviewsQuery = client.query('SELECT * FROM "Subsection" WHERE "EmployeeId" = $1', [reviewerIds[i]]);
      }

      giveReviewsQuery.on('row', function(row){
        reviewResults.push(row);
      });

      giveReviewsQuery.on('end', function(){
        response.send(reviewResults);
      });
    });
    if(err){response.send('server leaderreview error')};
  });
});

module.exports = router;
