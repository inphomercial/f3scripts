F3ScriptsApp.controller('cashflowController', function($scope, CalculationService) {

	$scope.total_business_funding = 100000;
	$scope.up_front_fees = 2500;
	$scope.back_end_fees = 0;
	$scope.amount_of_funding = 0;
	$scope.interest_reserve = 0;
	$scope.loan_amortization = 8.3;
	$scope.variable_interest_rate_loc = 5.00;

	$scope.monthlyPayments = function()
	{
		var i = ($scope.variable_interest_rate_loc / 100) / 12;
		var b = $scope.loan_amortization * 12;
		var c = $scope.total_business_funding;

		var result = CalculationService.pmt(i, b, -c);

		return $scope.trimAfterDecimal(result, 2);
	}

	$scope.netFundingAmount = function()
	{
		var total_fees = 0;
		total_fees += parseInt($scope.up_front_fees);
		total_fees += parseInt($scope.back_end_fees);
		total_fees += parseInt($scope.amount_of_funding);

		return $scope.trimAfterDecimal($scope.total_business_funding - total_fees, 2);
	}

	$scope.variableInterestRate = function()
	{
		return $scope.trimAfterDecimal($scope.variable_interest_rate_loc, 2);
	}

	$scope.interestReserve = function()
	{
		return $scope.trimAfterDecimal($scope.total_business_funding * $scope.interest_reserve, 2);
	}

	$scope.monthsOfPaymentsReserved = function()
	{
		return $scope.trimAfterDecimal($scope.interestReserve() / $scope.monthlyPayments(), 2);
	}

	$scope.amountInvestedInManagedAccounts = function()
	{
		return $scope.trimAfterDecimal($scope.netFundingAmount() - $scope.interestReserve(), 2);
	}

	$scope.effectiveMonthlyCostOfCapital = function()
	{
		var result = $scope.monthlyPayments() / $scope.amountInvestedInManagedAccounts();

		// Make into a percentage
		var percent = result * 100;

		return $scope.trimAfterDecimal(percent, 2);
	}

	$scope.monthlyNetPL = function ( percent )
	{
		var per = (percent/100).toFixed(2);

		var result = $scope.amountInvestedInManagedAccounts() * per - $scope.monthlyPayments();

		return $scope.trimAfterDecimal(result, 2);
	}

	$scope.trimAfterDecimal = function ( number, how_many_left )
	{
		return number.toFixed(how_many_left);
	}

	// Watches to prevent blank text fields
	$scope.$watch('total_business_funding', function()
	{
		if($scope.total_business_funding == "")
		{
			$scope.total_business_funding = 0;
		}
	});

	$scope.$watch('up_front_fees', function()
	{
		if($scope.up_front_fees == "")
		{
			$scope.up_front_fees = 0;
		}
	});

	$scope.$watch('back_end_fees', function()
	{
		if($scope.back_end_fees == "")
		{
			$scope.back_end_fees = 0;
		}
	});

	$scope.$watch('amount_of_funding', function()
	{
		if($scope.amount_of_funding == "")
		{
			$scope.amount_of_funding = 0;
		}
	});

	$scope.$watch('interest_reserve', function()
	{
		if($scope.interest_reserve == "")
		{
			$scope.interest_reserve = 0;
		}
	});

	$scope.$watch('loan_amortization', function()
	{
		if($scope.loan_amortization == "")
		{
			$scope.loan_amortization = 0;
		}
	});

	$scope.$watch('variable_interest_rate_loc', function()
	{
		if($scope.variable_interest_rate_loc == "")
		{
			$scope.variable_interest_rate_loc = 0;
		}
	});
});