// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ui.router', 'satellizer'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// .run(function($httpBackend){
//   // $httpBackend.whenGET('http://localhost:8100/valid')
//   //       .respond({message: 'This is my valid response!'});
//   // $httpBackend.whenGET('http://localhost:8100/notauthenticated')
//   //       .respond(401, {message: "Not Authenticated"});
//   // $httpBackend.whenGET('http://localhost:8100/notauthorized')
//   //       .respond(403, {message: "Not Authorized"});
 
//   $httpBackend.whenPOST('http://localhost:8000/api/v1/authenticate').passThrough();
//   $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
//  })

//  .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
//   $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
//     // if ('data' in next && 'authorizedRoles' in next.data) {
//     //   var authorizedRoles = next.data.authorizedRoles;
//     //   if (!AuthService.isAuthorized(authorizedRoles)) {
//     //     event.preventDefault();
//     //     $state.go($state.current, {}, {reload: true});
//     //     $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//     //   }
//     // }
 
//     // if (!AuthService.isAuthenticated()) {
//     //   if (next.name !== 'app.login') {
//     //     event.preventDefault();
//     //     $state.go('app.login');
//     //   }
//     // }

//     console.log('stateChangeStart to '+event+'- fired when the transition begins. toState,toParams : \n');
//   });
// })

.config(function($stateProvider, $urlRouterProvider, $authProvider, $provide) {
  $authProvider.loginUrl = 'http://localhost:8000/api/v1/authenticate';
  $authProvider.httpInterceptor = false;

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.login', {
        parent: 'app',
        url: '^/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })

    .state('app.search', {
      url: '^/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
        url: '^/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
    .state('app.playlists', {
      url: '^/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'DashCtrl'
        }
      }
    });  

    // function redirectWhenLoggedOut($q, $injector) {
    //     return {
    //         responseError: function (rejection) {
    //             var $state = $injector.get('$state');
    //             var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

    //             angular.forEach(rejectionReasons, function (value, key) {
    //                 if (rejection.data.error === value) {
    //                     localStorage.removeItem('user');
    //                     $state.go('app.login');
    //                 }
    //             });

    //             return $q.reject(rejection);
    //         }
    //     }
    // }

    // $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

  
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');
});
