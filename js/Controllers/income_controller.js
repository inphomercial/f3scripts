F3ScriptsApp.controller('incomeController', function($scope, IncomeService) {

	// Incomes
	$scope.income = [];

	// Populate incomes
	$scope.income = IncomeService.income;

	// Populate the IncomeService
	IncomeService.populateIncome();

	/**
	* Creates a blank income field
	* Does this update the model because of its $scope.income = IncomeService.income?
	* Is this the right way of doing this? Or should I update the Service Directly here?
	*/
	$scope.createBlankIncomeField = function( type )
	{
		var income = {
			'title' : "",
			'amount': 0
		}

		// Push to type
		$scope.income[type].push(income);
	}

	/**
	* Totals up all three income types
	*/
	$scope.totalIncomes = function()
	{
		return IncomeService.getTotal();
	}

	/**
	* Deletes an income field & removes it from the Service
	*/
	$scope.removeIncomeField = function( type, index )
	{
		IncomeService.removeIncome( type, index );
	}

	window.scope = $scope;

});