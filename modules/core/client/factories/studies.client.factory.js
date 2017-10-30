angular.module('core').factory('Studies', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        //console.log(__dirname);
        return $http.get('http://localhost:3000/list');
      }
    };

    return methods;
  }
]);
