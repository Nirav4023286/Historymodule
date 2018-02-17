agGrid.initialiseAgGridWithAngular1(angular);
  
var module = angular.module("example", ["agGrid","ui.bootstrap"]);

module.controller("exampleCtrl", function($scope, $http) {

$scope.openfrom = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedfrom = true;
  };
  $scope.opento = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedto = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
    var columnDefs = [
        {headerName: "Athlete", field: "athlete", width: 150, cellRenderer: athleteCellRendererFunc},
        {headerName: "Age", field: "age", width: 150, cellRenderer: ageCellRendererFunc},
        {headerName: "Year", field: "year", width: 150},
        {headerName: "Date", field: "date", width: 150},
        {headerName: "Sport", field: "sport", width: 150},
        {headerName: "Gold", field: "gold", width: 150},
        {headerName: "Silver", field: "silver", width: 150},
        {headerName: "Bronze", field: "bronze", width: 150},
        {headerName: "Total", field: "total", width: 150}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null,
        angularCompileRows: true
    };
    $scope.gridOptions1 = {
        columnDefs: columnDefs,
        rowData: null,
        angularCompileRows: true
    };

    function ageClicked(age) {
        window.alert("Age clicked: " + age);
    }

    function athleteCellRendererFunc() {
        return '<span ng-bind="data.athlete"></span>';
    }

    function ageCellRendererFunc(params) {
        params.$scope.ageClicked = ageClicked;
        return '<button ng-click="ageClicked(data.age)" ng-bind="data.age"></button>';
    }
 
    $http.get("https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinners.json")
        .then(function(res){
            $scope.gridOptions.api.setRowData(res.data);
   $scope.gridOptions1.api.setRowData(res.data);
        });
});
module.filter('dateFilter', function() {
    return function(input, start, end) {
      var inputDate = new Date(input),
        startDate = new Date(start),
        endDate = new Date(end),
        result = [];

      for (var i = 0, len = input.length; i < len; i++) {
        inputDate = new Date(input[i].DepartureDateTime);
        if (startDate < inputDate && inputDate < endDate) {
          result.push(input[i]);
        }
      }
      return result;
    };
  });