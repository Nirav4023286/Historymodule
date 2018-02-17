var myapp=angular.module('myapp',[]);
angular.module('myapp',[]).factory();


    function Action() {

        var menu = document.getElementById("change_action");
    
        var selected = menu.addEventListener("change", generateData);
    
        function generateData(event){
                if (menu.value == 'All') {
                    //do something
                }
                else if (menu.value == 'Edit') {
                    //do something
                }
                else if (menu.value == 'Save') {
                    //do something
                }
                else if (menu.value == 'Delete') {
                    //do something
                }
               
            };
    };
    /*For selecting filter for date*/

    var last7DayStart = moment().startOf('day').subtract(1,'week');
    var lastMonthThisDay = moment().startOf('day').subtract(1,'month');
    var yesterdayEndOfRange =  moment().endOf('day').subtract(1,'day');
    
    var javascriptArrayOfObjectsWithDates = [
        { date : '2017-12-14T10:12:14.00Z', anotherProperty: 0 },
        { date : moment().subtract(1, 'day' ).format(), testThis: 'works!'}
      ];

var filteredObjects = _.filter(javascriptArrayOfObjectsWithDates,     
                     function(each){ 
                        return moment(each.date)
                          .isBetween(last7DayStart, yesterdayEndOfRange) ;
                     });
 
