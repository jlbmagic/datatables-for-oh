//Here we're importing items we'll need. You can add other imports here.
import "./style.css";
import "regenerator-runtime/runtime.js";

var table;

// exposing loadData to FileMaker Script
window.loadData = function (json) {
  var obj = JSON.parse(json); // data from FM is a string
  var data = obj.data;
  // return;
  // create column headers from data
  var firstRecord = data[0];
  var columns = [
    { data: "fieldData.Id", title: "ID", visible: false },
    { data: "fieldData.City", title: "City" },
    { data: "fieldData.CompanyName", title: "Company" },
    {
      data: "fieldData.State",
      title: "State",
      render: (data, type, row) => data + "!!!",
    },
    { data: "fieldData.StreetAddress", title: "Address" },
  ];

  console.log(columns);
  // Create the DataTable, after destroying it if already exists
  if (table) table.destroy();
  table = $("#dtable").DataTable({
    paging: true,
    pageLength: 3,
    searching: true,
    colReorder: false,
    columns: columns,
    data: data,
  });

  // Add the click handler to the row, after removing it if already exists
  $("#dtable tbody").off("dblclick");
  $("#dtable tbody").on("dblclick", "tr", function () {
    var record = table.row(this).data();
    var json = JSON.stringify(record);

    FileMaker.PerformScript("On Double Click Row", json);
  });
};
