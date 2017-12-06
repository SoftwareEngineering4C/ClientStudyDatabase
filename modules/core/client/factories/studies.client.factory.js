angular.module('core').factory('Studies', ['$http', '$window',
  function($http, $window) {
    var methods = {
      getAll: function() {
        return $http.get($window.location.protocol + '//' + $window.location.host + '/api/studies/');
      },

      create: function(study) {
        return $http.post($window.location.protocol + '//' + $window.location.host + '/api/studies/', study);
      },

      delete: function(id) {
        return $http.delete($window.location.protocol + '//' + $window.location.host + '/api/studies/' + id);
      },

      update: function(study) {
        return $http.put($window.location.protocol + '//' + $window.location.host + '/api/studies/', study);
      }
    };

    return methods;
  }
]);
