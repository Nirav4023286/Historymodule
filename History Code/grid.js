var masterColumnDefs = [
    // group cell renderer needed for expand / collapse icons
    {field: 'Date', cellRenderer:'agGroupCellRenderer'},
    {field: 'Description'},
    {field: 'Owner'},
    {field: 'Status'},
    {field: 'Type', valueFormatter: "x.toLocaleString() "}
];

var masterGridOptions = {
    columnDefs: masterColumnDefs,
    rowData: rowData,
    masterDetail: true,
    detailRowHeight: 260,
    detailCellRenderer: DetailPanelCellRenderer,
    onGridReady: function(params) {
        params.api.forEachNode(function (node) {
            node.setExpanded(node.id === "1");
        });
        params.api.sizeColumnsToFit();
    }
};

function DetailPanelCellRenderer() {}

DetailPanelCellRenderer.prototype.init = function(params) {
    // trick to convert string of HTML into DOM object
    var eTemp = document.createElement('div');
    eTemp.innerHTML = this.getTemplate(params.data);
    this.eGui = eTemp.firstElementChild;

    this.setupDetailGrid(params.data.callRecords);
};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, masterGridOptions);
});