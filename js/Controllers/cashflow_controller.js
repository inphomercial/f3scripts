F3ScriptsApp.controller('cashflowController', function($scope, CalculationService) {

	$scope.total_business_funding = 100000;
	$scope.total_business_funding_empty = false;

	$scope.up_front_fees = 2500;
	$scope.up_front_fees_empty = false;

	$scope.back_end_fees = 0;
	$scope.back_end_fees_empty = false;

	$scope.amount_of_funding = 0;
	$scope.amount_of_funding_empty = false;

	$scope.interest_reserve = "0.00";
	$scope.interest_reserve_empty = false;

	$scope.loan_amortization = 8.3;
	$scope.loan_amortization_empty = false;

	$scope.variable_interest_rate_loc = "5.00";

	$scope.pl_percentage = 5;
	$scope.pl_percentage_empty = false;

	$scope.monthly_princial_repayment = 0;

	$scope.monthsForRepayment = function()
	{
		var result = $scope.netFundingAmount() / $scope.monthly_princial_repayment;

		return $scope.trimAfterDecimal(result, 2);
	}

	$scope.monthlyPrincipalRepayment = function()
	{
		$scope.monthly_princial_repayment = $scope.monthlyNetPL($scope.pl_percentage) - $scope.monthlyPayments();

		return $scope.trimAfterDecimal($scope.monthly_princial_repayment, 2);
	}

	$scope.monthlyPayments = function()
	{
		var i = (parseFloat($scope.variable_interest_rate_loc) / 100) / 12;
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
		return $scope.trimAfterDecimal(parseFloat($scope.variable_interest_rate_loc), 2);
	}

	$scope.interestReserve = function()
	{
		var result = $scope.total_business_funding * $scope.interest_reserve;

		return $scope.trimAfterDecimal(result, 2);
	}

	$scope.monthsOfPaymentsReserved = function()
	{
		return $scope.trimAfterDecimal($scope.interestReserve() / $scope.monthlyPayments(), 0);
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
		if($scope.total_business_funding.length == 0)
		{
			$scope.total_business_funding_empty = true;
		}
		else
		{
			$scope.total_business_funding_empty = false;
		}
	});

	$scope.$watch('up_front_fees', function()
	{
		if($scope.up_front_fees.length == 0)
		{
			$scope.up_front_fees_empty = true;
		}
		else
		{
			$scope.up_front_fees_empty = false;
		}
	});

	$scope.$watch('back_end_fees', function()
	{
		if($scope.back_end_fees.length == 0)
		{
			$scope.back_end_fees_empty = true;
		}
		else
		{
			$scope.back_end_fees_empty = false;
		}
	});

	$scope.$watch('amount_of_funding', function()
	{
		if($scope.amount_of_funding.length == 0)
		{
			$scope.amount_of_funding_empty = true;
		}
		else
		{
			$scope.amount_of_funding_empty = false;
		}
	});

	$scope.$watch('interest_reserve', function(new_val)
	{
		if($scope.interest_reserve.length == 0)
		{
			$scope.interest_reserve_empty = true;
		}
		else
		{
			$scope.interest_reserve_empty = false;
		}
	});

	$scope.$watch('pl_percentage', function() {
		if($scope.pl_percentage == 0)
		{
			$scope.pl_percentage_empty = true;
		}
		else
		{
			$scope.pl_percentage_empty = false;
		}
	});

	$scope.interestReserveCheckIfWhole = function()
	{
		if(!isNaN(parseFloat($scope.interest_reserve)))
		{
			if($scope.interest_reserve % 1 === 0)
			{
				$scope.interest_reserve = parseInt($scope.interest_reserve).toFixed(2);
			}
		}
	}

	$scope.$watch('loan_amortization', function()
	{
		if($scope.loan_amortization.length == 0)
		{
			$scope.loan_amortization_empty = true;
		}
		else
		{
			$scope.loan_amortization_empty = false;
		}
	});

	$scope.$watch('variable_interest_rate_loc', function()
	{
		if($scope.variable_interest_rate_loc.length == 0)
		{
			$scope.variable_interest_rate_loc_empty = true;
		}
		else
		{
			$scope.variable_interest_rate_loc_empty = false;
		}
	});

	$scope.variableInterestRateCheckIfWhole = function()
	{
		if(!isNaN(parseFloat($scope.variable_interest_rate_loc)))
		{
			if($scope.variable_interest_rate_loc % 1 === 0)
			{
				$scope.variable_interest_rate_loc = parseInt($scope.variable_interest_rate_loc).toFixed(2);
			}
		}
	}
});