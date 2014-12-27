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
	
	$("#owlkaraoke").html("<li>A</li><li>A</li><li>A</li><li>A</li><li>A</li>");
	
	//initialize the owl-carousel plug-in
	//on the #owlkaraoke ul element.
	$("#owlkaraoke").owlCarousel();
	var owl = $("#owlkaraoke").data("owlCarousel");
	
	
	
	//function populatelists start
	function populatelists() {
	
		//declare videos_datatable var
		//to correspond to
		//datatables API instance
		var videos_datatable = $("#videos_datatable").DataTable();
		
		
		owl.destroy();
		$("#owlkaraoke")
			.contents()
			.remove();
		
		
	
		$("#videos_datatable tbody tr").each( function () {
			
			var videoiddata = videos_datatable.cell(this, 4).data();
			//get the index of the rows
			//based on their table ordering,
			//not the html rendering
			var trhtmlindex = $(this).index();
			$(this).attr({
				"data-videoid": videoiddata,
				"data-htmlindex":trhtmlindex
			});
			
			//get the index of the rows
			//based on their datatable ordering,
			//not the html rendering
			var trposindex = videos_datatable.row(this).index();
			
			var songtitlenode = videos_datatable.cell(this, 1).node();
			var songtitle = $(songtitlenode).html();
			
			var indexdata = videos_datatable.cell(this, 0).data();
			var indexnode = videos_datatable.cell(this, 0).node();
			var indexnum = $(indexnode)
				.html('<p>' + indexdata + '</p>');
			
			
			var videoidnode = videos_datatable.cell(this, 4).node();
			var videoid = $(videoidnode).html();
			$(videoidnode)
				.html('<img src="https://i3.ytimg.com/vi/' + videoid + '/default.jpg" alt="' + songtitle + ' thumbnail" width="120px" height="90px" longdesc="Thumbnail for the Youtube karaoke video of ' + songtitle + '" />');
				
			var titledata = videos_datatable.cell(this, 1).data();
			var performdata = videos_datatable.cell(this, 3).data();

			//create li items for the
			//#owlkaraoke table
			var owlkaraokeliitem = $("<li>");
			
			//insert tr attributes into the owlkaraoke li item
			owlkaraokeliitem.attr({
				"data-videoid": videoiddata,
				"data-htmlindex":trhtmlindex
			});
			
			//add content into
			//each owlkaraoke list item
			var videoposter = $(videoidnode).html();
			owlkaraokeliitem.append(videoposter);
			
			function addowllinodes(){
				owllitext = '';
				owllitext += '<h6>' + titledata + '</h6>';
				owllitext += '<p>' + performdata + '</p>';
				return owllitext;
			}
			
			var owlkaraokelinodes = addowllinodes();
			owlkaraokeliitem.append(owlkaraokelinodes);
			
			$("#owlkaraoke").append(owlkaraokeliitem);

		});
		
		//reinitialize owlCarousel
		$("#owlkaraoke").owlCarousel({/*
			items: 4,
			itemsDesktop: [1199,4],
			itemsDesktopSmall: [979,3],
			itemsTablet: [768,2],
			itemsMobile: [479,2],
			pagination: true,*/
			navigation: true/*,
			afterInit: owllivideoindex
		*/});
		
		/*
		function owllivideoindex(){
			//behaviour of owlhotel li items on click
			$("#owlhotel li").each(function(){
				$(this).click(function(){
				
					//associate each owlhotel li with its own data-index
					var liplaylistindex = $(this).attr("data-index");
					
					//play the video at the liplaylistindex
					player.playVideoAt(liplaylistindex);
					
					//animate the page to scroll to the video
					$("html, body").animate({
						scrollTop: $("#banner").offset().top 
					},500);
					
				});
			});
			
			
			
			//set the style of the
			//owlhotel li img
			$("#owlhotel li img").css({
				"height":($("#owlhotel li img").width() * 0.5625) + "px"
			});
			
			$(window).resize(function(){
				$("#owlhotel li img").css({
					"height":($("#owlhotel li img").width() * 0.5625) + "px"
				});
			});
		} */
		
		
		
	//function populatelists end
	}

});