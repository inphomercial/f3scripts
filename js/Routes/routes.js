F3ScriptsApp.config(['$routeProvider', function($routeProvider)
{
    $routeProvider
      .when('/cashflow', {
        templateUrl: 'views/cashflow.html'
      })
      .when('/moneymanage', {
        templateUrl: 'views/moneymanage.html'
      })
      .otherwise({
        templateUrl: 'views/cashflow.html'
      });
  }]);