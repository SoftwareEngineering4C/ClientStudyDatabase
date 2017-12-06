angular.module('core').factory('Requirements', ['$http', '$window',
  function($http, $window) {
    var methods = {
      getAll: function() {
        return $http.get($window.location.protocol + '//' + $window.location.host + '/api/requirements/');
      },

      getOne: function(databaseName) {
        return $http.get($window.location.protocol + '//' + $window.location.host + '/api/requirements/' + databaseName);
      },

      create: function(requirement) {
        return $http.post($window.location.protocol + '//' + $window.location.host + '/api/requirements/', requirement);
      },

      delete: function(id) {
        return $http.delete($window.location.protocol + '//' + $window.location.host + '/api/requirements/' + id);
      }

    }
    return methods;
  }
]);
