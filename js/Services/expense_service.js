F3ScriptsApp.factory('ExpenseService', function(StorageService) {

    var ExpenseService = {

        expense : {
            food: [{'title': 'testtt', 'amount': 555}],
            housing: [],
            transportation: [],
            insurance: [],
            medical: [],
            debt: [],
            other: []
        },

        // Called initially to get the cached items
        populateExpense: function()
        {
            ExpenseService.expense.food           = StorageService.get("expense_food");
            ExpenseService.expense.housing        = StorageService.get("expense_housing");
            ExpenseService.expense.transportation = StorageService.get("expense_transportation");
            ExpenseService.expense.insurance      = StorageService.get("expense_insurance");
            ExpenseService.expense.medical        = StorageService.get("expense_medical");
            ExpenseService.expense.debt           = StorageService.get("expense_debt");
            ExpenseService.expense.other          = StorageService.get("expense_other");
        },


        // Returns the current total of all incomes
        getTotal: function()
        {
            var total = 0;

            angular.forEach(ExpenseService.expense, function ( value ) {
                for(var i=0; i<value.length; i++)
                {
                    total += parseInt(value[i].amount);
                }
            });

            // Save Expenses each time we total
            ExpenseService.saveExpense();

            return total;
        },

        // Saves all incomes to cache
        saveExpense: function()
        {
            StorageService.save("expense_food", ExpenseService.expense.food);
            StorageService.save("expense_housing", ExpenseService.expense.housing);
            StorageService.save("expense_transportation", ExpenseService.expense.transportation);
            StorageService.save("expense_insurance", ExpenseService.expense.insurance);
            StorageService.save("expense_medical", ExpenseService.expense.medical);
            StorageService.save("expense_debt", ExpenseService.expense.debt);
            StorageService.save("expense_other", ExpenseService.expense.other);
        },

        /**
        * Remove expense field
        * type ex: food, housing, etc
        * index $index from ng-repeat
        */
        removeExpense: function( type, index )
        {
            ExpenseService.expense[type].splice(index, 1);
        }
    };

    return ExpenseService;
});