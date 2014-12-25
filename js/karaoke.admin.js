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
			
			var songtitlenode = videos_datatable.cell(this, 1).node();
			var songtitledata = videos_datatable.cell(this, 1).data();
			var songtitle_array = songtitledata.split(" ");
			var songtitle_join = songtitle_array.join("+");
			var songtitle = $(songtitlenode).html();
			
			var indexdata = videos_datatable.cell(this, 0).data();
			var indexnode = videos_datatable.cell(this, 0).node();
			var indexnum = $(indexnode)
				.html('<p>' + indexdata + '</p><a href="update_video.php?video_id=' + videoiddata + '"><p>Edit Video Details</p></a><a href="delete_video.php?video_id=' + videoiddata + '&song_title=' + songtitle_join + '" onclick="return confirm(\'Are You Sure?\')"><p>Delete Video</p></a>');
			
			
			var videoidnode = videos_datatable.cell(this, 4).node();
			var videoid = $(videoidnode).html();
			$(videoidnode)
				.html('<img src="https://i3.ytimg.com/vi/' + videoid + '/default.jpg" alt="' + songtitle + ' thumbnail" width="120px" height="90px" longdesc="Thumbnail for the Youtube karaoke video of ' + songtitle + '" />');

		});
	}

});