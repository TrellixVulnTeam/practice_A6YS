var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope){
				if (!$rootScope.loggedIn) {
					$location.path('/');
				}
			}
		},
		templateUrl: 'dashboard.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('loginCtrl', function($scope, $location, $rootScope){
	$scope.submit = function() {
		//$rootScope.thisName = 'something';
		if($scope.username == 'admin' && $scope.password == 'admin') {
			$rootScope.loggedIn = true
			$location.path('/dashboard');
		} else {
			alert('Wrong username or password.')
		}
	};
});