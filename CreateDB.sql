CREATE DATABASE "regis-reviews";

-- connect "regis-reviews" 


CREATE TABLE "employeeData" (
    "Id" integer NOT NULL,
    "EmployeeName" character varying(255),
    "RegisId" character varying(255),
    "Title" character varying(255),
    "HireDate" character varying(255),
    "LeaderName" character varying(255),
    "LeaderRegisId" character varying(255),
    "Department " character varying(255),
    "ReviewPeriod" character varying(255),
    "DateInPosition" character varying(255),
    "ReviewLanguage" character varying(255),
    "ReviewStatus" integer,
    "ReviewType" character varying(255),
    "EmployeeSignature" character varying(255),
    "LeaderSignature" character varying(255),
    "PositionRegion" character varying(255)
);



CREATE TABLE "Subsection" (
    "Id" integer NOT NULL,
    "EmployeeId" integer,
    "SectionId" integer,
    "SubsectionId" integer,
    "Goal" character varying(255),
    "EmployeeGoalRating" character varying(255),
    "EmployeeResponse" character varying(255),
    "LeaderGoalRating" character varying(255),
    "LeaderResponse" character varying(255),
    "isCompleted" boolean DEFAULT false,
    "isLeaderCompleted" boolean DEFAULT false,
    "EmployeeHairRating" integer,
    "LeaderHairRating" integer,
    "EmployeeFinalRating" integer,
    "LeaderFinalRating" integer,
    "SS_Actual" integer,
    "SS_Target" integer,
    "RS_Actual" integer,
    "RS_Target" integer,
    "TS_Actual" integer,
    "TS_Target" integer,
    "TS_Rating" integer,
    "C_Actual" integer,
    "C_Target" integer,
    "C_Rating" integer,
    "SGC_Actual" integer,
    "SGC_Target" integer,
    "SGC_Rating" integer,
    "OverallRating" integer
);


