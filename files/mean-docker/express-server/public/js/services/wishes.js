angular.module('wishService', [])

	// super simple service
	// each function returns a promise object
	.factory('Wishes', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/wishes');
			},
			create : function(wishData) {
				return $http.post('/api/wishes', wishData);
			},
			delete : function(id) {
				return $http.delete('/api/wishes/' + id);
			}
		}
	}]);