angular.module('yum', ['ngRoute', 'btford.markdown']).
  config(function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        controller: 'IndexController',
        templateUrl: '/partials/index'
      }).
      when('/page/:id', {
        controller: 'PageController',
        templateUrl: '/partials/page'
      }).
      when('/new/page', {
        controller: 'PageController',
        templateUrl: '/partials/new-page'
      }).
      when('/page/:id/edit', {
        controller: 'PageController',
        templateUrl: '/partials/edit-page'
      }).
      when('/page/:id/delete', {
        controller: 'PageController',
        templateUrl: '/partials/del-page'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }).
  controller('PageController', function ($scope, $http, $location, $routeParams) {
    $scope.page = {};
    $http.get('/api/page/' + $routeParams.id).success(function (data) {
      $scope.page = data;
    });
    $scope.delPage = function () {
      $http.delete('/api/page/' + $routeParams.id).success(function () {
        $location.url('/'); 
      });
    };
    $scope.editPage = function () {
      $http.post('/api/page', $scope.page).success(function (data) {
        $location.url('/page/' + $scope.page.title);
      });
    };
    $scope.createPage = function () {
      $http.post('/api/page', $scope.page).success(function (data) {
        $location.url('/page/' + $scope.page.title);
      });
  }).
  controller('IndexController', function ($scope, $http) {
    $http.get('/api/index').success(function (data) {
      $scope.pages = data;
  });
});