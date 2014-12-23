$(document).ready(function(){

	$("#videos_datatable").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "ajax/table_processing.php",
		"dom": "<\"col-xs-8\"l><\"col-xs-4\"f><\"col-sm-8 col-xs-12\"i><\"col-sm-4 col-xs-12\"p><\"col-xs-12\"t><\"col-sm-8 col-xs-12\"i><\"col-sm-4 col-xs-12\"p>r",
		"columnDefs":[
				{"orderable": false, "targets":[4, 10]}
			],
		"drawCallback": function (settings) {
				populatelists();
			}
    });
	
	function populatelists() {
		$("#videos_datatable tbody tr").each( function () {
		
			//declare videos_datatable var
			//to correspond to
			//datatables API instance
			var videos_datatable = $("#videos_datatable").DataTable();
			
			var videoiddata = videos_datatable.cell(this, 4).data();
			$(this).attr({
				"data-videoid" : videoiddata
			});
			
			//get the index of the rows
			//based on their table ordering,
			//not the html rendering
			var trindex = $(this).index();
			
			//adopt the trindex into the tr html
			$(this).attr({
				"data-index":trindex
			});
			
			var videoidnode = videos_datatable.cell(this, 4).node();
			var videoid = $(videoidnode).html();

			var songtitlenode = videos_datatable.cell(this, 1).node();
			var songtitle = $(songtitlenode).html();
	
			$(videoidnode).html('<img src="https://i3.ytimg.com/vi/' + videoid + '/default.jpg" alt="' + songtitle + ' thumbnail" width="120px" height="90px" longdesc="Thumbnail for the Youtube karaoke video of ' + songtitle + '" />');

		});
	}

});