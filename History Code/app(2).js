(function() {

    angular.module("myapp", ["historyModule"]);

    angular.module('myapp').controller('myappController', ['$scope', '$http', '$timeout', 'historyHandler', function($scope, $http, $timeout, historyHandler) {

        const dummyDataSet = [

            {
                "Project_ID": 2,
                "Record_ID": 5,
                "Modified_On": "2/05/2006",
                "Description": "jnj",
                "type": "Create"
            },
            {
                "Project_ID": 3,
                "Record_ID": 23,
                "Modified_On": "29/08/2004",
                "Description": "United States",
                "type": "Create"
            },
            {
                "Project_ID": 4,
                "Record_ID": 23,
                "Modified_On": "2/08/2007",
                "Description": "United States",
                "type": "Create"
            },
            {
                "Project_ID": 5,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Create"
            },
            {
                "Project_ID": 6,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Create"
            },
            {
                "Project_ID": 7,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Update"
            },
            {
                "Project_ID": 8,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Delete"
            },
            {
                "Project_ID": 9,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Delete"
            },
            {
                "Project_ID": 10,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Delete"
            },
            {
                "Project_ID": "11",
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Delete"
            },
            {
                "Project_ID": 12,
                "Record_ID": 23,
                "Modified_On": "29/03/2008",
                "Description": "United States",
                "type": "Delete"
            }

        ];

        function filterActionHandler(data) {
            alert(`TeamTypeFilter ${data.TeamTypeFilter} | DateFilter FROM DATE: ${data.DateFilter.fromDate} TO DATE: ${data.DateFilter.toDate} | EventActionFilter ${data.EventActionFilter}`);
        }

        historyHandler.setFilterActionHandler(filterActionHandler);

        /*
            $http.get("https://raw.githubusercontent.com/ag-grid/ag-grid-docs/master/src/olympicWinners.json")
            .then(function (res) {
                historyHandler.loadGrid(res.data);
            });
        */
        $timeout(function() {
            historyHandler.loadGrid(dummyDataSet);
        })


    }]);

    // myappController.$inject = ['$scope','$http','historyHandler'];


})();