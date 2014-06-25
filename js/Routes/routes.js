F3ScriptsApp.config(['$routeProvider', function($routeProvider)
{
    $routeProvider
      .when('/cashflow', {
        templateUrl: 'views/cashflow.html'
      })
      .otherwise({
        templateUrl: 'views/cashflow.html'
        /*redirectTo: 'views/login.html'*/
      });
  }]);