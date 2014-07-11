F3ScriptsApp.controller('managementController', function($scope, StorageService) {

	/**
	* Empties all localstorage keys
	*/
	$scope.clear = function()
	{
		StorageService.clear();
	}

	window.scope = $scope;

});