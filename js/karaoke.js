$(document).ready(function(){

	$("#videos_datatable").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "ajax/table_processing.php",
		"dom": "<\"col-sm-8 col-xs-12\"i><\"col-sm-4 col-xs-12\"p><\"col-sm-8 col-xs-12\"l><\"col-sm-4 col-xs-12\"f><\"col-xs-12\"t><\"col-sm-8 col-xs-12\"l><\"col-sm-4 col-xs-12\"f><\"col-sm-8 col-xs-12\"i><\"col-sm-4 col-xs-12\"p>r",
		"responsive" : true,
		"columnDefs":[
				{"orderable": false, "targets":[4, 10]},
				{className: "never", "targets":[0, 11]},
				{className: "none", "targets":[2, 9, 10]},
				{className: "all strong", "targets":[1]},
				{className: "all", "targets":[3, 4]},
				{className: "min-tablet", "targets":[5, 7]},
				{className: "min-desktop", "targets":[0, 6, 8]}
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
		
		$("#karaoketitlelist").empty();
		
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
			
			//create li items for karaoketitlelist
			var karaoketitlelistitem = $("<li>");
			
			//associate trhtmlindex
			//to each li item
			karaoketitlelistitem.attr({
				"data-htmlindex":trhtmlindex
			});
			
			//function for adding content
			//to the karaokedesclist li item
			function addtitlelinodes(){
				var titlelitext = "";
				titlelitext += '<h6>' + titledata + '</h6>';
				titlelitext += '<p>Performed By: ' + performdata + '</p>';
				
				return titlelitext;
			}
			
			karaoketitlelistitem.append(addtitlelinodes);
			
			//add the karaoketitlelist li item to the list
			$("#karaoketitlelist").append(karaoketitlelistitem);
			
			//create li items for karaokedesclist
			var karaokedesclistitem = $("<li>");
			
			//associate trhtmlindex
			//to each li item
			karaokedesclistitem.attr({
				"data-htmlindex":trhtmlindex
			});
			
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
		owlkaraoke.owlCarousel({
			itemsDesktop: [1199,5],
			itemsDesktopSmall: [979,4],
			itemsTablet: [768,3],
			itemsMobile: [479,2],
			pagination: false,
			navigation: true,
			afterInit: owllivideoindex,
			beforeMove: getOrSetOwlNav,
			afterAction: getOrSetOwlNav
		});
		
		
		function owllivideoindex(){
		

		
		
			//behaviour of owlhotel li items on click
			$("#owlkaraoke li").each(function(){
				$(this).addClass("gradient");
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
		} 
		
		function getOrSetOwlNav(){
			//get number data on table pagination
			var pageinfo = videos_datatable.page.info();
			//get 1-indexed page of table
			var currentpage = pageinfo.page + 1;
			//get 1-indexed last page index of table
			var lastpage = pageinfo.pages;
			
			var currentowlitem = this.currentItem;
			var lastowlitem = this.maximumItem;
			//multiple conditions on
			//current page of table
			if (currentpage == 1) {
				//multiple conditions on
				//current owl items shown
				if (currentowlitem === 0) {
					$(".owl-buttons").html('<div class="owl-next">next</div>');
				} else if (currentowlitem < lastowlitem) {
					$(".owl-buttons").html('<div class="owl-prev">prev</div><div class="owl-next">next</div>');
				} else if (currentowlitem === lastowlitem) {
					$(".owl-buttons").html('<div class="owl-prev">prev</div><div id="owl-nextpage">next page</div>');
					$("#owl-nextpage").click(function(){
						videos_datatable.page( 'next' ).draw( false );
					});
				}
			} else if (currentpage < lastpage) {
				if (currentowlitem === 0) {
					$(".owl-buttons").html('<div id="owl-prevpage">prev page</div><div class="owl-next">next</div>');
					$("#owl-prevpage").click(function(){
						videos_datatable.page( 'previous' ).draw( false );
					});
				} else if (currentowlitem < lastowlitem) {
					$(".owl-buttons").html('<div class="owl-prev">prev</div><div class="owl-next">next</div>');
				} else if (currentowlitem === lastowlitem) {
					$(".owl-buttons").html('<div class="owl-prev">prev</div><div id="owl-nextpage">next page</div>');
					$("#owl-nextpage").click(function(){
						videos_datatable.page( 'next' ).draw( false );
					});
				}
			} else if(currentpage == lastpage) {
				if (currentowlitem < lastowlitem) {
					$(".owl-buttons").html('<div id="owl-prevpage">prev page</div><div class="owl-next">next</div>');
					$("#owl-prevpage").click(function(){
						videos_datatable.page( 'previous' ).draw( false );
					});
				} else if (currentowlitem === lastowlitem) {
					$(".owl-buttons").html('<div id="owl-prevpage">prev page</div>');
					$("#owl-prevpage").click(function(){
						videos_datatable.page( 'previous' ).draw( false );
					});
				}
			}
			
			
		}
		
		
	//function populatelists end
	}

});