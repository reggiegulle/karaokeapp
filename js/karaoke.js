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
				tableInteraction();
			}
    });
	
	//function populatelists start
	function tableInteraction() {
	
		//declare videos_datatable var
		//to correspond to
		//datatables API instance
		var videos_datatable = $("#videos_datatable").DataTable();
		
		
		//add the necessary classes to owlkaraoke
		var owlkaraoke = $("#owlkaraoke").addClass("owl-carousel");
		var owlkaraoke = $("#owlkaraoke").addClass("owl-theme");
		
		//create the owlkaraoke owlCarousel instance
		owlkaraoke.owlCarousel();
		
		//destroy the owlkaraoke owlCarousel instance
		owlkaraoke.data("owlCarousel").destroy();
		$("#owlkaraoke").removeClass("owl-carousel");
		$("#owlkaraoke").removeClass("owl-theme");
		$("#owlkaraoke").empty();
		
		$("#karaokedesclist").empty();
		
		//start ".each" table tr function
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
			
			//create li items for karaokedesclist
			var karaokedesclistitem = $("<li>");
			
			var composerdata = videos_datatable.cell(this, 2).data();
			var albumdata = videos_datatable.cell(this, 5).data();
			var releasedata = videos_datatable.cell(this, 6).data();
			var genredata = videos_datatable.cell(this, 7).data();
			var countrydata = videos_datatable.cell(this, 8).data();
			var rntmdata = videos_datatable.cell(this, 9).data();
			var lyricsdata = videos_datatable.cell(this, 10).data();
			
			//associate trhtmlindex
			//to each li item
			karaokedesclistitem.attr({
				"data-htmlindex":trhtmlindex
			});
			
			
			
			//function for adding content
			//to the karaokedesclist li item
			function adddesclinodes(){
				var desclitext = "";
				desclitext += videoposter;
				desclitext += '<h6>' + titledata + '</h6>';
				desclitext += '<p>Composed By: ' + composerdata + '</p>';
				desclitext += '<p>Performed By: ' + performdata + '</p>';
				desclitext += '<p>From the Album: ' + albumdata + '</p>';
				desclitext += '<p>Year of Release: ' + releasedata + '</p>';
				desclitext += '<p>Genre: ' + genredata + '</p>';
				desclitext += '<p>Country of Origin: ' + countrydata + '</p>';
				desclitext += '<p>Running Time: ' + rntmdata + '</p>';
				desclitext += '<p>Lyrics: </p><br /><pre>' + lyricsdata + '</pre>';
				
				return desclitext;
			}
			
			karaokedesclistitem.append(adddesclinodes);
			
			//add the owlhotel li item to the list
			$("#karaokedesclist").append(karaokedesclistitem);
		
		
		//end ".each" table tr function
		});
		
		//add the owlCarouel classes again
		var owlkaraoke = $("#owlkaraoke").addClass("owl-carousel");
		var owlkaraoke = $("#owlkaraoke").addClass("owl-theme");
		
		//reinitialize owlCarousel
		owlkaraoke.owlCarousel({/*
			items: 4,
			itemsDesktop: [1199,4],
			itemsDesktopSmall: [979,3],
			itemsTablet: [768,2],
			itemsMobile: [479,2],
			pagination: true,*/
			navigation: true,
			afterInit: owllivideoindex,
			afterAction: logvisible
		});
		
		
		function owllivideoindex(){
			//behaviour of owlhotel li items on click
			$("#owlkaraoke li").each(function(){
				$(this).click(function(){
				
					//associate each owlhotel li with its own data-index
					var liplaylistindex = $(this).attr("data-htmlindex");
					
					//play the video at the liplaylistindex
					player.playVideoAt(liplaylistindex);
					
					//animate the page to scroll to the video
					$("html, body").animate({
						scrollTop: $("#video-player-container").offset().top 
					},500);
					
				});
			});
			
			
		    /*	
			//set the style of the
			//owlhotel li img
			$("#owlhotel li img").css({
				"height":($("#owlhotel li img").width() * 0.5625) + "px"
			});
			
			$(window).resize(function(){
				$("#owlhotel li img").css({
					"height":($("#owlhotel li img").width() * 0.5625) + "px"
				});
			});*/
		} 	
		
		function logvisible(){
			if(this.currentItem === this.maximumItem){
				console.log("Last Item!");
			} else if(this.currentItem === 0) {
				console.log("First Item!");
			} else {
				console.log("Middle Item!");
			}
		}
		
	//function populatelists end
	}

});