angular.module('starter')
 
.service('AuthService', function($q, $http, USER_ROLES, $auth) {
  var LOCAL_TOKEN_KEY = 'myPocket';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
 
    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var login = function(name, pw) {
    return $q(function(resolve, reject) {

      var credentials = {
          email: name,
          password: pw
      }

      $auth.login(credentials)
        .then(function(response) {
      
          //$http.post('http://localhost:8000/api/v1/authenticate').success(function(response){
          // Make a request and receive your auth token from your server
          console.log('http://localhost:8000/api/v1/authenticateasd');
          // $http
          //   .post('http://localhost:8000/api/v1/authenticate', credentials)
          //   .then(function (res) {
          var user = JSON.stringify(response);
          console.log(user);
          storeUserCredentials(user);
          resolve('Login success.');
          //  });
          // $http({
          //     method: 'POST',
          //     url: 'http://localhost:8000/api/v1/authenticate',
          //     data: JSON.stringify(credentials),
          //     headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
          // }).success(function(response){
          //   var user = JSON.stringify(response);
          //   console.log(user);
          //   storeUserCredentials(user);
          //   resolve('Login success.');
          // })
        })
        .catch(function(response){
            //$scope.loginError = true;
            //$scope.loginErrorText = error.data.error;
            console.log(response);
            reject(response);
        });
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});