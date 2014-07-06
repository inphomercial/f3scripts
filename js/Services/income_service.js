F3ScriptsApp.factory('IncomeService', function(StorageService) {

    var IncomeService = {

        income : {
            net: [],
            passive: [],
            misc: []
        },

        // Called initially to get the cached items
        populateIncome: function()
        {
            IncomeService.income.net     = StorageService.get("income_net");
            IncomeService.income.passive = StorageService.get("income_passive");
            IncomeService.income.misc    = StorageService.get("income_misc");
        },


        // Returns the current total of all incomes
        getTotal: function()
        {
            var total = 0;

             angular.forEach(IncomeService.income, function ( value ) {
                for(var i=0; i<value.length; i++)
                {
                    total += parseInt(value[i].amount);
                }
            });

            // Save Incomes each time we total
            IncomeService.saveIncome();

            return total;
        },

        // Saves all incomes to cache
        saveIncome: function()
        {
            StorageService.save("income_net", IncomeService.income.net);
            StorageService.save("income_passive", IncomeService.income.passive);
            StorageService.save("income_misc", IncomeService.income.misc);
        },

        /**
        * Remove income field
        * type ex: net, passive, misc
        * index $index from ng-repeat
        */
        removeIncome: function( type, index )
        {
            IncomeService.income[type].splice(index, 1);
        }
    };

    return IncomeService;
});