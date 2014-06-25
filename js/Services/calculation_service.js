F3ScriptsApp.factory('CalculationService', function($http) {

    var CalculationService = {

       // Calculate PMT
       pmt: function(interest_rate, months, loan_amount ) {
            return interest_rate * loan_amount * Math.pow((1 + interest_rate), months) / (1 - Math.pow((1 + interest_rate), months));
        }
    };

    // http://jsfiddle.net/TrCYX/24/

    return CalculationService;
});