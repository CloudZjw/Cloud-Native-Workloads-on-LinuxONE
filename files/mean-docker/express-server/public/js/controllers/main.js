var mainController = angular.module('Controller', [])


	mainController.controller('Register', ['$scope', '$http', 'Users', function ($scope, $http, Users) {
		$scope.fromUserData = {};
		$scope.registering = false;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Users.get()
			.success(function (data) {
				console.log(data);
				$scope.users = data;
				$scope.registering = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createUser = function () {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log($scope.fromUserData);
			if ($scope.fromUserData.user_name != undefined) {
				console.log("I'm in.");
				$scope.registering = true;

				// call the create function from our service (returns a promise object)
				Users.create($scope.fromUserData)
					// if successful creation, call our get function to get all the new todos
					.success(function (data) {
						console.log("TERMINATE");
						$scope.registering = false;
						$scope.fromUserData = {}; // clear the form so our user is ready to enter another

					});
			}

		}

		isDigitOrLetter = function (s) {
			var re = /^[0-9a-zA-Z]*$/g;
			if (!re.test(s))
				return false;
			return true;
		};

		isEmail = function (s) {
			var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (!pattern.test(s))
				return false;
			return true;
		}

		$scope.userNameFormmatRight = function () {
			if ('user_name' in $scope.fromUserData && $scope.fromUserData.user_name) {
				return $scope.userNameValid();
			}
			return true;
		};

		$scope.userNameValid = function () {
			if (!'user_name' in $scope.fromUserData || !$scope.fromUserData.user_name)
				return false;
			var user_name = $scope.fromUserData.user_name;
			return isDigitOrLetter(user_name) && user_name.length >= 6 && user_name.length <= 15;
		};

		$scope.codeFormmatRight = function () {
			if ('code' in $scope.fromUserData && $scope.fromUserData.code) {
				var code = $scope.fromUserData.code;
				return isDigitOrLetter(code) && code.length >= 6;
			}
			return true;
		};

		$scope.emailFormmatRight = function () {
			if ('email' in $scope.fromUserData && $scope.fromUserData.email) {
				var email = $scope.fromUserData.email;
				return isEmail(email);
			}
			return true;
		};

		emailValid = function () {
			if (!'email' in $scope.fromUserData || !$scope.fromUserData.email)
				return false;
			return isEmail($scope.fromUserData.email);
		};


		codeValid = function () {
			if (!'code' in $scope.fromUserData)
				return false;
			else
				return $scope.fromUserData.code && $scope.codeAgain && $scope.codeFormmatRight() && $scope.fromUserData.code == $scope.codeAgain;
		};

		$scope.allRight = function () {
			var allRight = $scope.userNameValid() && codeValid() && emailValid();
			console.log(allRight);
			return allRight;
		};


		$scope.submit = function () {
			$scope.createUser();
		};

	}])


	mainController.controller('wishController', ['$scope', '$http', 'Wishes', function ($scope, $http, Wishes) {
		$scope.wishData = {};
		$scope.wishing = false;
		$scope.bonusList = [1,2,3]

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Wishes.get()
			.success(function (data) {
				console.log(data);
				$scope.wishes = data;
				$scope.wishing = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createWish = function () {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log($scope.wishData);
			if ($scope.wishData.title && $scope.wishData.user_name != undefined) {
				console.log("make a vow");
				$scope.wishing = true;

				// call the create function from our service (returns a promise object)
				Wishes.create($scope.wishData)
					// if successful creation, call our get function to get all the new todos
					.success(function (data) {
						console.log("TERMINATE");
						$scope.wishing = false;
						$scope.wishData = {}; // clear the form so our user is ready to enter another

					});
			}

		};