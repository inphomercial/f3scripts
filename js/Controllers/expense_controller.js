F3ScriptsApp.controller('expenseController', function($scope, ExpenseService) {

	// Expenses
	$scope.expenses_food = [];

	// Get Saved Expenses
	$scope.expense = ExpenseService.expense

	// Populate the ExpenseService
	ExpenseService.populateExpense();

	$scope.createBlankExpenseField = function( type )
	{
		var expense = {
			'title' : "",
			'amount' : 0
		}

		// Push to type
		$scope.expense[type].push(expense);
	}

	$scope.totalExpenses = function()
	{
		return ExpenseService.getTotal();
	}

	$scope.removeExpenseField = function( type, index )
	{
		ExpenseService.removeExpense( type, index );
	}

	/*$scope.totalExpenses = function()
	{
		StorageService.saveExpenses($scope.expenses_food);

		var total = CalculationService.totalExpenses($scope.expenses_food);

		// Add Step #1 to the total
		total += $scope.calculateStep1();

		// Add Step #2 to the total
		total += $scope.calculateStep2();

		return total.toFixed(2);
	}*/

	/*$scope.getPercent = function(amount)
	{
		return CalculationService.getPercent(amount);
	}*/

	// Investment 10%
	/*$scope.calculateStep1 = function()
	{
		var total_income = CalculationService.getTotalIncome();

		return total_income * 0.1;
	}

	// Charity 10%
	$scope.calculateStep2 = function()
	{
		var total_income = CalculationService.getTotalIncome();

		return total_income * 0.1;
	}

	// Living Expenses 70%?, add all expenses (not including investment capital step1) and divide it by totalIncome
	$scope.calculateStep3 = function()
	{
		// Total Expenses
		var total_e = CalculationService.totalExpenses($scope.expenses);

		// Total Income
		var total_i = CalculationService.getTotalIncome();

		//
		return total_e / total_i;
	}

	$scope.createExpenseField = function( type )
	{
		var expense = {
			'title' : "",
			'amount': 0
		}

		switch ( type ) {
			case "food":
				$scope.expenses_food.push( expense );
				console.log("found food");
				break;
			default:
				console.log("Problem creating expense field");
				break;
		}

		console.log("through");
	}

	$scope.removeExpenseField = function( type, index )
	{
		switch ( type ) {
			case "food":
				CalculationService.removeArrayElementByIndex( $scope.expenses_food, index );
				break;
			default:
				console.log("Problem removing income field");
				break;
		}

		$scope.$apply();
	}*/

	window.scope = $scope;

});