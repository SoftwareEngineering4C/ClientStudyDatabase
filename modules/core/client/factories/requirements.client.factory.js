angular.module('core').factory('Requirements', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('https://localhost:3000/api/requirements');
      }
    };

    return methods;
  }
]);
