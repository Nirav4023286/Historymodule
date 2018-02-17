(function () {

    agGrid.initialiseAgGridWithAngular1(angular);

    angular.module("historyModule", ["agGrid"]);

    angular.module('historyModule').factory('historyHandler', [historyHandler]);

    function historyHandler() {
        var gridData,gridControl;

        return {
            setGridControl: setGridControl,
            getGridControl: getGridControl,
            loadGrid: loadGrid
        }

        // function setGridData(data) {
        //     this.gridData = data;
        // }

        // function getGridData() {
        //     return this.gridData;
        // }

        function setGridControl(gridControl){
            this.gridControl = gridControl;
        }

        function getGridControl(){
            return this.gridControl;
        }

        function loadGrid(data){
            this.gridControl.api.setRowData(data);
        }
    }

    angular.module('historyModule').directive('historyComponent', [historyComponent]);

    function historyComponent() {
        return {
            restrict: 'EA',
            controller: ['$scope', '$http', 'historyHandler', function ($scope, $http, historyHandler) {
             $scope.editoption = [
			                  { value: '1', displayName: 'All' },
                              { value: '2', displayName: 'Create' },
                              { value: '3', displayName: 'Update' },
                              { value: '4', displayName: 'Delete' }
                            ];
                $scope.selecteoption= 'All';
                function formattedDate(d) {
                    let month = String(d.getMonth() + 1);
                    let day = String(d.getDate());
                    const year = String(d.getFullYear());

                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;

                    return `${year}-${month}-${day}`;
                }
     /////////date filter start from here/////////////
                   $scope.filter = function () {

                    if ($scope.from > $scope.to) {
                        alert("Enter valid date range");
                    }
                    else if ($scope.to < $scope.from) {
                        alert("Enter valid date range");
                    }
					else if ($scope.to==undefined || $scope.from==undefined){
						alert("Enter date ranges");
					}
                    else {
                        var from = formattedDate($scope.from)
                        var to = formattedDate($scope.to)
                        // get filter instance
                        var dobFilterComponent = $scope.gridOptions.api.getFilterInstance('Modified_On');

                        // get filter model
                        var model = dobFilterComponent.getModel();

                        // OR set filter model and update
                        dobFilterComponent.setModel({
                            type: 'equals',
                            dateFrom: from,
                            dateTo: to
                        });
                        $scope.gridOptions.api.onFilterChanged()

                        // NOTE number filter allows for ranges
                        dobFilterComponent.setModel({
                            type: 'inRange',
                            dateFrom: from,
                            dateTo: to
                        });
                       
						
						
						// get filter instance
						var typeFilterComponent = $scope.gridOptions.api.getFilterInstance('type');

						// get filter model
						var model = typeFilterComponent.getModel();

						// OR set filter model and update
						typeFilterComponent.setModel({
							type:'contains',
							filter:$scope.selecteoption
						});
						$scope.gridOptions.api.onFilterChanged()
						
                    }
                }



                //grid system start from here//
             var columnDefs = [
                { headerName: "Project Id", field: "Project_ID", width: 300 },
                { headerName: "Record Id", field: "Record_ID", width: 300},
         
                { headerName: "Modified_On", field: "Modified_On", width: 300,
                        filter: "agDateColumnFilter",
                        filterParams: {
                         // provide comparator function
                         comparator: function (filterLocalDateAtMidnight, cellValue) {
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
				{ headerName: "Description", field: "Description", width: 300 },
                { headerName: "Type", field: "type", width: 200,  filter: "agTextColumnFilter",
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

            }],
            template: `
            <div>
            <div class="row col-md-12" >
            <div class="btn-group col-md-3" role="group" aria-label="..." >
  <button type="button" class="btn btn-default r" ng-click="team(event)"><span class="glyphicon glyphicon-user"></span> TEAM</button>
  <button type="button" class="btn btn-default r"  ng-click="personal(event)">
  <span class="glyphicon glyphicon-user"></span>
  <span class="glyphicon glyphicon-user"></span> PERSONAL</button>
  </div>
                <div class="col-md-4">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <p class="input-group">
                            <input type="date" class="form-control" ng-model="from" ng-required="true" placeholder="From"  />
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="input-group">
                            <input type="date" class="form-control" id="theDate" ng-model="to" ng-required="true" placeholder="To" />
    
                        </p>
    
                    </div>
                </div>
                </div>
               
                <div class="col-md-2">
				<select ng-model="selecteoption" class="selectpicker form-control" ng-options="edit.displayName as edit.displayName for edit in editoption" required ng-change="browserChanged(selecteoption)">
                 </select> 
                 </div>
                 <div class="col-md-2">
                 <button type="button" id="addData" class="btn btn-secondary r" ng-click="filter()">Filter</button>
             </div>
				
				</div>
				</div>
            <div ag-grid="gridOptions" class="ag-theme-material g col-md-12"></div>
    
        </div>
    
    
            `
        }
    }


})();