$(document).ready(function(){

 $("#videos_datatable").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "ajax/table_processing.php"
    });


});