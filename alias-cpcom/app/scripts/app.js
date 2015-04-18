'use strict';

/**
 * @ngdoc overview
 * @name aliasCpcomApp
 * @description
 * # aliasCpcomApp
 *
 * Main module of the application.
 */
angular
  .module('aliasCpcomApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/aliascommune', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/aliascommune/:communeId', {
        templateUrl: 'views/commune.html',
        controller: 'CommuneCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
