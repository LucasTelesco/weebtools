// A $( document ).ready() block.
//$( document ).ready(function() {
//    console.log( "ready!" );
//});

angular.module('app', [])
	.controller('myController', function($scope, $http){
		console.log("$http",$http);
		//Levanta los datos cuando se refresca la pagina
		var refresh = function(){
		$http.get('/products')
			.then(function(response) {
				console.log("hola, todo ok", response);
				$scope.products = response.data;
				$scope.product = ({});
			}, function errorCallback(response) {
				console.log("hola, todo mal!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		};
		refresh();
		$scope.propertyName = 'prod_name';
		$scope.reverse = true;

		$scope.sortBy = function(propertyName) {
    		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	        $scope.propertyName = propertyName;
	  };

		//Add Product
		$scope.addProduct = function () {
			console.log($scope.product);
			$http.post('/products',$scope.product)
			.then(function(response) {
				refresh();
				console.log("Ok ADD", response);
			}, function errorCallback(response) {
				console.log("Bad ADD", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		//Remove
		$scope.remove = function(id){
			console.log("Remove: ", id);
			$http.delete('/products/' + id)
			.then(function(response) {
				refresh();
				console.log("Ok delete", response);
			}, function errorCallback(response) {
				console.log("BAD delete!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		$scope.edit = function(id){
			console.log("Edit: ", id);
			$http.get('/products/' + id)
			.then(function(response) {
				$scope.product = response.data;
				console.log("OK Edit RD: ", response.data);
			}, function errorCallback(response) {
				console.log("Bad edit!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}

		$scope.update = function(){
			console.log("UPDATE: ", $scope.product);
			$http.put('/products/' + $scope.product._id, $scope.product)
			.then(function(response) {
				refresh();
				console.log("OK Update", response);
			}, function errorCallback(response) {
				refresh();
				console.log("BAD Update!!", response);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
		$scope.deselect = function(){
			$scope.product = ({});
		}
		});
