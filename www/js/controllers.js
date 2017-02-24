angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();
 
  // $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Unauthorized!',
  //     template: 'You are not allowed to access this resource.'
  //   });
  // });
 
  // $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
  //   AuthService.logout();
  //   $state.go('app.login');
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Session Lost!',
  //     template: 'Sorry, You have to login again.'
  //   });
  // });
  //console.log("AppCtrl");
  $scope.$on('$routeChangeError', function(current, previous, rejection) {
      console.log("routeChangeError", currrent, previous, rejection);
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };

  $scope.$on('$routeChangeStart', function(next, current) {
      console.log("routeChangeStart");
      console.dir(next);
      console.dir(current);
  });

  $scope.$on('$routeChangeSuccess', function(current, previous) {
      console.log("routeChangeSuccess");
      console.dir(current);
      console.dir(previous);
  });

  $scope.$on('$routeUpdate', function(rootScope) {
      console.log("routeUpdate", rootScope);
  });
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  //$scope.data = {};
 
  $scope.login = function(data) {
    //console.log(data);
    AuthService.login(data.email, data.password).then(function(authenticated) {
      $state.go('playlists', {}, {reload: true});
      $scope.setCurrentUsername(data.email);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
 
  // $scope.performValidRequest = function() {
  //   $http.get('http://localhost:8100/valid').then(
  //     function(result) {
  //       $scope.response = result;
  //     });
  // };
 
  // $scope.performUnauthorizedRequest = function() {
  //   $http.get('http://localhost:8100/notauthorized').then(
  //     function(result) {
  //       // No result here..
  //     }, function(err) {
  //       $scope.response = err;
  //     });
  // };
 
  // $scope.performInvalidRequest = function() {
  //   $http.get('http://localhost:8100/notauthenticated').then(
  //     function(result) {
  //       // No result here..
  //     }, function(err) {
  //       $scope.response = err;
  //     });
  // };
});
