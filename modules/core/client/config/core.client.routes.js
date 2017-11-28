(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('filter', {
        url: '/filter',
        templateUrl: '/modules/core/client/views/filter.client.view.html'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      .state('administrator', {
        url: '/administrator',
        templateUrl: '/modules/core/client/views/administrator.client.view.html'
      })
      .state('addStudy', {
        url: '/addStudy',
        templateUrl: '/modules/core/client/views/addStudy.client.view.html'
      })
      .state('createNewRequirement', {
        url: '/createNewRequirement',
        templateUrl: '/modules/core/client/views/createNewRequirement.client.view.html'
      })
      .state('addRequirement', {
        url: '/addRequirement',
        templateUrl: '/modules/core/client/views/addRequirement.client.view.html'
      })

      .state('newHome', {
        url: '/newHome',
        templateUrl: '/modules/core/client/views/newHome.client.view.html'

      .state('editStudy', {
        url: '/editStudy',
        templateUrl: '/modules/core/client/views/editStudy.client.view.html',
        params: {
          study: {}
        }

      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }
}());
