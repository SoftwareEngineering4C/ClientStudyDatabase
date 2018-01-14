angular.module('core').factory('Archive', ['$http', '$window',
  function($http, $window) {
    var methods = {
      getAll: function() {
        return $http.get($window.location.protocol + '//' + $window.location.host + '/api/archive/');
      },

      create: function(study) {
        return $http.post($window.location.protocol + '//' + $window.location.host + '/api/archive/', study);
      },


      delete: function(id) {
        return $http.delete($window.location.protocol + '//' + $window.location.host + '/api/archive/' + id);
      },

      update: function(study) {
        return $http.put($window.location.protocol + '//' + $window.location.host + '/api/archive/', study);
      }
    };

    return methods;
  }
]);
