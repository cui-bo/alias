'use strict';

/**
 * @ngdoc function
 * @name aliasCpcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aliasCpcomApp
 */
var aliasCom = angular.module('aliasCpcomApp');


// Alias commune service
aliasCom.service('CommuneService', function() {
  /*
   var commune = {};
   return {
   getCommune: function(){
   return commune;
   },
   setCommune: function(commune) {
   commune = commune;
   }
   }*/
  var communes = [{'id':5, 'cp':'12345', 'libelle':'bo'}];

  this.showCommunes = function() {
    return communes;
  }

  this.setCommune = function(newCommune) {
    if(newCommune.constructor === Array) {
      communes = communes.concat(newCommune);
    } else if (newCommune.constructor === Object) {
      communes.push(newCommune);
    }
  }
});

// Main page
aliasCom.controller('MainCtrl', function ($scope, $http, CommuneService) {
  $http.get('data/cpcom.json').success(function(data) {
    console.log('success');
    $scope.communes = data;
    CommuneService.setCommune(data);
  }).error(function() {
    console.log('error');
  });
});

// Detail page
aliasCom.controller('CommuneCtrl', function($scope, $routeParams, CommuneService) {
  var communeId = $routeParams.communeId;
  $scope.communeId = communeId;

  var allCommunes = CommuneService.showCommunes();
  var commune = getElementById(allCommunes, communeId);
  $scope.commune = commune;

  $scope.variations = [
    {
      'id':1,
      'libelle':'variation1',
      'ocr':true,
      'vdc':false,
      'code':0
    },
    {
      'id':2,
      'libelle':'variation2',
      'ocr':true,
      'vdc':true,
      'code':0
    }
  ];

  $scope.addVariation = function() {
    var libelle = $scope.libelle;
    var ocr = $scope.ocr;
    var vdc = $scope.vdc;

    if($scope.libelle != null) {

      var ocr = $scope.ocr ? $scope.ocr : false;
      var vdc = $scope.vdc ? $scope.vdc : false;

      var newVariation = {
        'id':getLargestIdFromArray($scope.variations),
        'libelle':$scope.libelle,
        'ocr':ocr,
        'vdc':vdc,
        'code':0
      };

      $scope.variations.push(newVariation);
    }
  };

  $scope.removeVariation = function($index) {
    //console.log('remove');
    $scope.variations.splice($index);
  };


});


var getElementById = function(arr, id) {
  var len = arr.length;
  if(len == 0) {return ;}
  for(var i=0; i<len; i++) {
    if(id == arr[i].id) {
      return arr[i];
    }
  }
};

var getLargestIdFromArray = function(arr) {
  var len = arr.length;
  if(len == 0) {return 1;}
  var id = arr[0].id;
  for(var i=0; i<len; i++) {
    if(arr[i].id > id) {
      id = arr[i].id;
    }
  }
  return id;
};
