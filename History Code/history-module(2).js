(function() {

    agGrid.initialiseAgGridWithAngular1(angular);

    angular.module("historyModule", ["agGrid"]);

    angular.module('historyModule').factory('historyHandler', [historyHandler]);

    function historyHandler() {
        var gridData, gridControl, filterActionHandler;

        return {
            setGridControl: setGridControl,
            getGridControl: getGridControl,
            loadGrid: loadGrid,
            setFilterActionHandler: setFilterActionHandler,
            getFilterActionHandler: getFilterActionHandler,

        }


        function setGridControl(gridControl) {
            this.gridControl = gridControl;
        }

        function getGridControl() {
            return this.gridControl;
        }

        function loadGrid(data) {
            this.gridControl.api.setRowData(data);
        }

        function setFilterActionHandler(func) {
            this.filterActionHandler = func;
        }

        function getFilterActionHandler() {
            return this.filterActionHandler;
        }



    }

    angular.module('historyModule').directive('historyComponent', [historyComponent]);

    function historyComponent() {
        return {
            restrict: 'EA',
            controller: ['$scope', '$http', 'historyHandler', function($scope, $http, historyHandler) {
                $scope.fromDate = new Date();
                $scope.toDate = new Date();

                $scope.TeamType1 = { IsActive: true, name: 'TEAM' };
                $scope.TeamType2 = { IsActive: false, name: 'PERSONAL' };

                $scope.filterActionData = { "TeamTypeFilter": $scope.TeamType1.name, "DateFilter": { fromDate: '', toDate: '' }, "EventActionFilter": '' };

                $scope.editoption = [{
                        value: '1',
                        displayName: 'All'
                    },
                    {
                        value: '2',
                        displayName: 'Create'
                    },
                    {
                        value: '3',
                        displayName: 'Update'
                    },
                    {
                        value: '4',
                        displayName: 'Delete'
                    }
                ];

                $scope.eventActionName = $scope.editoption[0].displayName;


                // proper documentation for following function
                function formattedDate(d) {
                    let month = String(d.getMonth() + 1);
                    let day = String(d.getDate());
                    const year = String(d.getFullYear());

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    return `${year}-${month}-${day}`;
                }


                $scope.filter = function() {
                    if ($scope.fromDate > $scope.toDate) {
                        alert("Enter valid date range");
                        return;
                    } else if ($scope.toDate < $scope.fromDate) {
                        alert("Enter valid date range");
                        return;
                    } else if ($scope.toDate == undefined || $scope.fromDate == undefined) {
                        alert("Enter date ranges");
                        return;
                    } else {

                        var fromDateFilterValue = formattedDate($scope.fromDate)
                        var toDateFilterValue = formattedDate($scope.toDate);

                        $scope.filterActionData["DateFilter"] = {
                            fromDate: fromDateFilterValue,
                            toDate: toDateFilterValue
                        };

                        $scope.filterActionData["EventActionFilter"] = $scope.eventActionName;
                        var filterActionhandler = historyHandler.getFilterActionHandler();
                        filterActionhandler($scope.filterActionData);
                    }
                }

                $scope.changeTeamType = function(event) {
                    if (event.target.name == $scope.TeamType1.name) {
                        $scope.TeamType1.IsActive = true;
                        $scope.filterActionData["TeamTypeFilter"] = $scope.TeamType1.name;
                        $scope.TeamType2.IsActive = false;
                    } else {
                        $scope.TeamType1.IsActive = false;
                        $scope.filterActionData["TeamTypeFilter"] = $scope.TeamType2.name;
                        $scope.TeamType2.IsActive = true;
                    }

                    var filterActionHandler = historyHandler.getFilterActionHandler();
                    filterActionHandler($scope.filterActionData);
                }

                //grid system start from here//
                var columnDefs = [{
                        headerName: "Project Id",
                        field: "Project_ID",
                        width: 150
                    },
                    {
                        headerName: "Record Id",
                        field: "Record_ID",
                        width: 300
                    },

                    {
                        headerName: "Modified_On",
                        field: "Modified_On",
                        width: 300,
                        filter: "agDateColumnFilter",
                        filterParams: {
                            // provide comparator function
                            comparator: function(filterLocalDateAtMidnight, cellValue) {
                                // In the example application, dates are stored as dd/mm/yyyy
                                // We create a Date object for comparison against the filter date
                                var dateParts = cellValue.split("/");
                                var day = Number(dateParts[2]);
                                var month = Number(dateParts[1]) - 1;
                                var year = Number(dateParts[0]);
                                var cellDate = new Date(day, month, year);
                                // Now that both parameters are Date objects, we can compare
                                if (cellDate < filterLocalDateAtMidnight) {
                                    return -1;
                                } else if (cellDate > filterLocalDateAtMidnight) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }
                    },
                    {
                        headerName: "Description",
                        field: "Description",
                        width: 300
                    },
                    {
                        headerName: "Type",
                        field: "type",
                        width: 200,
                        filter: "agTextColumnFilter",
                        filterParams: {
                            filterOptions: ["contains"],
                            debounceMs: 0,
                            caseSensitive: true
                        }

                    },

                ];

                $scope.gridOptions = {
                    columnDefs: columnDefs,
                    rowData: null,
                    angularCompileRows: true
                };

                historyHandler.setGridControl($scope.gridOptions);

                // comment this out later
                window.test = $scope;

            }],
            template: `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="btn-group col-md-3" role="group" aria-label="...">
                <button type="button" class="btn btn-default" ng-class="{teamTypeButton:TeamType1.IsActive}" name={{TeamType1.name}} ng-click="changeTeamType($event)">
                    <span class="glyphicon glyphicon-user"></span>
                    {{TeamType1.name}}
                </button>
                <button type="button" class="btn btn-default" ng-class="{teamTypeButton:TeamType2.IsActive}" name={{TeamType2.name}} ng-click="changeTeamType($event)">
                    <span class="glyphicon glyphicon-user"></span>
                    <span class="glyphicon glyphicon-user"></span>
                    {{TeamType2.name}}
                </button>
            </div>
            <div class="col-md-4">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="date" class="form-control" ng-model="fromDate" ng-required="true"  />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="date" class="form-control" ng-model="toDate" ng-required="true" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-2">
                <select ng-model="eventActionName" class="selectpicker form-control" ng-options="edit.displayName as edit.displayName for edit in editoption" required ng-change="browserChanged(selecteoption)">
                </select>
            </div>
            <div class="col-md-2">
                <button type="button" id="addData" class="btn btn-secondary r" ng-click="filter()">Filter</button>
            </div>
        </div>
        <div class="col-md-12" style="margin-top:1rem">
            <div ag-grid="gridOptions" class="ag-theme-material g col-md-12"></div>
        </div>
    </div>
</div>
            `
        }
    }


})();