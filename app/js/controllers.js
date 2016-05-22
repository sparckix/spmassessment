'use strict';

/* Controllers */

var controllers = angular.module('SPMassessmentControllers', []);

controllers.controller('HomeCtrl', ['$scope', '$location',
  function($scope, $location) {  
}]);

controllers.controller('AssessmentCtrl', ['$scope', '$routeParams', 'questionsFactory', '$location', '$interval', '$http',
  function($scope, $routeParams, questionsFactory, $location, $interval, $http) {
    
    //Begin variables
    $scope.percentile = {};
    $scope.maturity_level = -1;
    $scope.answers = {};
    $scope.focusareas_scores = {};  
    $scope.focusareas_lowestunsatisfied = {};  

    $scope.inProgress = false;
    $scope.someProgress = 0;
      
    //end variables

    //Begin hard-coded section
    $scope.capabilities = {0: "None", 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F"}
    $scope.fareas = { 
        0: "Requirements gathering",
        1: "Requirements identification",
        2: "Requirements organizing",
        3: "Requirements prioritization",
        4: "Release definition",
        5: "Release definition validation",
        6: "Scope change management",
        7: "Release build validation",
        8: "Launch preparation",
        9: "Roadmap intelligence",
        10: "Core asset roadmapping",
        11: "Product roadmapping",
        12: "Market analysis",
        13: "Partnering & contracting",
        14: "Product lifecycle management",
    }

      //Begin Maturity matrix initialization
    var matrix = [];
    for(var i=0; i<15; i++) {
        matrix[i] = {};
    }
    matrix[0] = {"None": 0, "A":2, "B":3, "C":5, "D":6, "E":7, "F":10}
    matrix[1] = {"None": 1, "A":4, "B":6, "C":9, "D":10}
    matrix[2] = {"None": 2, "A":4, "B":6, "C":10}
    matrix[3] = {"None": 1, "A":3, "B":4, "C":5, "D":8, "E":10}
    matrix[4] = {"None": 1, "A":2, "B":3, "C":7, "D":9, "E":10}
    matrix[5] = {"None": 3, "A":6, "B":8, "C":10}
    matrix[6] = {"None": 2, "A":4, "B":6, "C":8, "D":10}
    matrix[7] = {"None": 3, "A":6, "B":8, "C":10}
    matrix[8] = {"None": 0, "A":2, "B":4, "C":5, "D":7, "E":9, "F":10}
    matrix[9] = {"None": 2, "A":4, "B":5, "C":7, "D":8, "E":10}
    matrix[10] = {"None": 3, "A":5, "B":7, "C":9, "D":10}
    matrix[11] = {"None": 1, "A":2, "B":5, "C":6, "D":8, "E":10}
    matrix[12] = {"None": 3, "A":5, "B":6, "C":7, "D":9, "E":10}
    matrix[13] = {"None": 4, "A":5, "B":7, "C":8, "D":9, "E":10}
    matrix[14] = {"None": 3, "A":4, "B":7, "C":8, "D":9, "E":10}

    /*
    matrix[0] = ["None","A",0,"B","C",0,"D","E","F",0,0];
    matrix[1] = [0,"None","A",0,0,"B",0,"C",0,0,"D"];
    matrix[2] = [0,0,"None","A",0,"B",0,"C",0,0,0];
    matrix[3] = [0,"None","A",0,"B","C","D",0,0,"E",0];
    matrix[4] = [0,"None","A","B","C",0,0,0,"D",0,"E"];
    matrix[5] = [0,0,0,"None","A",0,0,"B",0,"C",0];
    matrix[6] = [0,0,"None","A",0,"B",0,"D",0,"E",0];
    matrix[7] = [0,0,0,"None","A",0,0,"B",0,"C",0];
    matrix[8] = ["None","A",0,"B",0,"C","D",0,"E",0,"F"];
    matrix[9] = [0,0,"None","A",0,"B","C",0,"D","E",0];
    matrix[10] = [0,0,0,"None","A",0,"B",0,"C",0,"D"];
    matrix[11] = [0,"None","A","B",0,0,"C","D",0,"E",0];
    matrix[12] = [0,0,0,"None","A",0,"B","C","D",0,"E"];
    matrix[13] = [0,0,0,0,"None","A","B",0,"C","D","E"];
    matrix[14] = [0,0,0,"None","A","B",0,0,"C","D","E"];*/
      //end maturity matrix initialization


    //end hard-coded section

    $scope.start = function() {
      $scope.id = 0;
      $scope.assessmentOver = false;
      $scope.inProgress = true;
      $scope.getQuestion();
    };
    $scope.reset = function() {
      $scope.inProgress = false;
    }
   
    $scope.getQuestion = function() {
      var q = questionsFactory.getQuestion($scope.id);
      if(q) {
        $scope.question = q.question;
        $scope.business_function = q.business_function;
        $scope.area = q.area;
        $scope.options = q.options;

        } else {
          $scope.assessmentOver = true;
          $scope.processResults();
        }
    };

    $scope.nextQuestion = function(option) {
        $scope.answers[$scope.id] = option;
        $scope.id++;
      
        $scope.getQuestion();
        $scope.someProgress = $scope.someProgress+1; 
    }

    $scope.processResults = function() {    

      var total_score = 0;
      //Requirements gathering
      var score_fa1 = $scope.processArea(0,6);
      var normalizedScore_fa1 = (score_fa1*3)/6;
      total_score += normalizedScore_fa1;
      $scope.focusareas_scores[0] = $scope.capabilities[score_fa1];
      $http.post('/api/assessment', {focus_area: 0, score: normalizedScore_fa1}).
        success(function(data) {
          $scope.percentile[0] = data.results;
      });
      
      //Requirements identification
      var score_fa2 = $scope.processArea(6,4);
      var normalizedScore_fa2 = (score_fa2*3)/4;
      total_score += normalizedScore_fa2;
      $scope.focusareas_scores[1] = $scope.capabilities[score_fa2];

      $http.post('/api/assessment', {focus_area: 1, score: normalizedScore_fa2}).
        success(function(data) {
          $scope.percentile[1] = data.results;
      });        
      //Requirements organizing
      var score_fa3 = $scope.processArea(10,3);
      var normalizedScore_fa3 = (score_fa3*3)/3;
      total_score += normalizedScore_fa3;
      $scope.focusareas_scores[2] = $scope.capabilities[score_fa3];
      $http.post('/api/assessment', {focus_area: 2, score: normalizedScore_fa3}).
        success(function(data) {
          $scope.percentile[2] = data.results;
      });
      //Requirements prioritization
      var score_fa4 = $scope.processArea(13,5);
      var normalizedScore_fa4 = (score_fa4*3)/5;
      total_score += normalizedScore_fa4;
      $scope.focusareas_scores[3] = $scope.capabilities[score_fa4];
      $http.post('/api/assessment', {focus_area: 3, score: normalizedScore_fa4}).
        success(function(data) {
          $scope.percentile[3] = data.results;
      });
      //Release definition
      var score_fa5 = $scope.processArea(18,5);
      var normalizedScore_fa5 = (score_fa5*3)/5;
      total_score += normalizedScore_fa5;
      $scope.focusareas_scores[4] = $scope.capabilities[score_fa5];
      $http.post('/api/assessment', {focus_area: 4, score: normalizedScore_fa5}).
        success(function(data) {
          $scope.percentile[4] = data.results;
      });
      //Release definition validation
      var score_fa6 = $scope.processArea(23,3);
      var normalizedScore_fa6 = (score_fa6*3)/3;
      total_score += normalizedScore_fa6;
      $scope.focusareas_scores[5] = $scope.capabilities[score_fa6];
      $http.post('/api/assessment', {focus_area: 5, score: normalizedScore_fa6}).
        success(function(data) {
          $scope.percentile[5] = data.results;
      });
      //Scope change management
      var score_fa7 = $scope.processArea(26,4);
      var normalizedScore_fa7 = (score_fa7*3)/4;
      total_score += normalizedScore_fa7;
      $scope.focusareas_scores[6] = $scope.capabilities[score_fa7];
      $http.post('/api/assessment', {focus_area: 6, score: normalizedScore_fa7}).
        success(function(data) {
          $scope.percentile[6] = data.results;
      });
      //Release build validation
      var score_fa8 = $scope.processArea(30,3);
      var normalizedScore_fa8 = (score_fa8*3)/3;
      total_score += normalizedScore_fa8;
      $scope.focusareas_scores[7] = $scope.capabilities[score_fa8];
      $http.post('/api/assessment', {focus_area: 7, score: normalizedScore_fa8}).
        success(function(data) {
          $scope.percentile[7] = data.results;
      });
      //Launch preparation
      var score_fa9 = $scope.processArea(33,6);
      var normalizedScore_fa9 = (score_fa9*3)/6;
      total_score += normalizedScore_fa9;
      $scope.focusareas_scores[8] = $scope.capabilities[score_fa9];
      $http.post('/api/assessment', {focus_area: 8, score: normalizedScore_fa9}).
        success(function(data) {
          $scope.percentile[8] = data.results;
      });
       //Roadmap intelligence
      var score_fa10 = $scope.processArea(39,5);
      var normalizedScore_fa10 = (score_fa10*3)/5;
      total_score += normalizedScore_fa10;
      $scope.focusareas_scores[9] = $scope.capabilities[score_fa10];
      $http.post('/api/assessment', {focus_area: 9, score: normalizedScore_fa10}).
        success(function(data) {
          $scope.percentile[9] = data.results;
      });
      //Core asset roadmapping
      var score_fa11 = $scope.processArea(44,4);
      var normalizedScore_fa11 = (score_fa11*3)/4;
      total_score += normalizedScore_fa11;
      $scope.focusareas_scores[10] = $scope.capabilities[score_fa11];
      $http.post('/api/assessment', {focus_area: 10, score: normalizedScore_fa11}).
        success(function(data) {
          $scope.percentile[10] = data.results;
      });
      //Product roadmapping
      var score_fa12 = $scope.processArea(48,5);
      var normalizedScore_fa12 = (score_fa12*3)/5;
      total_score += normalizedScore_fa12;
      $scope.focusareas_scores[11] = $scope.capabilities[score_fa12];
      $http.post('/api/assessment', {focus_area: 11, score: normalizedScore_fa12}).
        success(function(data) {
          $scope.percentile[11] = data.results;
      });
      //Market analysis
      var score_fa13 = $scope.processArea(53,5);
      var normalizedScore_fa13 = (score_fa13*3)/5;
      total_score += normalizedScore_fa13;
      $scope.focusareas_scores[12] = $scope.capabilities[score_fa13];
      $http.post('/api/assessment', {focus_area: 12, score: normalizedScore_fa13}).
        success(function(data) {
          $scope.percentile[12] = data.results;
      });
       //Partnering & contracting
      var score_fa14 = $scope.processArea(58,5);
      var normalizedScore_fa14 = (score_fa14*3)/5;
      total_score += normalizedScore_fa14;
      $scope.focusareas_scores[13] = $scope.capabilities[score_fa14];
      $http.post('/api/assessment', {focus_area: 13, score: normalizedScore_fa14}).
        success(function(data) {
          $scope.percentile[13] = data.results;
      });
      //Product lifecycle management      
      var score_fa15 = $scope.processArea(63,5);
      var normalizedScore_fa15 = (score_fa15*3)/5;
      total_score += normalizedScore_fa15;
      $scope.focusareas_scores[14] = $scope.capabilities[score_fa15];
      $http.post('/api/assessment', {focus_area: 14, score: normalizedScore_fa15}).
        success(function(data) {
          $scope.percentile[14] = data.results;
      });

      //Maturity profile calculation
        //Requirements management [0,2]
      $scope.maturity_reqmgmt = Math.min(matrix[0][$scope.focusareas_scores[0]],matrix[1][$scope.focusareas_scores[1]],matrix[2][$scope.focusareas_scores[2]]);
        //Requirements management [3,8]
      $scope.maturity_relplan = Math.min(matrix[3][$scope.focusareas_scores[3]],matrix[4][$scope.focusareas_scores[4]],matrix[5][$scope.focusareas_scores[5]],
        matrix[6][$scope.focusareas_scores[6]],matrix[7][$scope.focusareas_scores[7]],matrix[8][$scope.focusareas_scores[8]]);
        //Requirements management [9,11]
      $scope.maturity_prodplan = Math.min(matrix[9][$scope.focusareas_scores[9]],matrix[10][$scope.focusareas_scores[10]],matrix[11][$scope.focusareas_scores[11]]);
        //Requirements management [12,14]
      $scope.maturity_portmgmt= Math.min(matrix[12][$scope.focusareas_scores[12]],matrix[13][$scope.focusareas_scores[13]],matrix[14][$scope.focusareas_scores[14]]);
      $scope.maturity_level = Math.min($scope.maturity_reqmgmt,$scope.maturity_relplan,$scope.maturity_prodplan,$scope.maturity_portmgmt);


      //Total score calculation
      total_score = total_score/15;
      //15 refers to the overall maturity score
      $http.post('/api/assessment', {focus_area: 15, score: total_score}).
        success(function(data) {
          $scope.percentile[15] = data.results;
      });      
    }

    $scope.processArea = function(lowerbound, num_capabilities) {
      var count = 0;
      var max = lowerbound + num_capabilities;
      while (lowerbound < max) {
        if ($scope.answers[lowerbound] == "Yes") {
          lowerbound++;
          count++;
        }
        else 
          break      
      }
      return count
    }
    
    $scope.range = function(n) {
        return new Array(n);
    };


  }]);


  $(function(){
    var footerHeight = $(".footer").height();
    $("body").css("margin-bottom", footerHeight);
    $(".footer").css("margin-top", -footerHeight);
  });