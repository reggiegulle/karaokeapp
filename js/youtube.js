var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player("player", {
		height: "100%",
		width: "100%",
		videoId: "",
		playerVars: {
				"autohide": 1,
				"controls": 2,
				"enablejsapi": 1,
				"iv_load_policy": 3,
				"modestbranding": 1,   
				"playsinline": 1,
				"rel": 0,
				"showinfo": 0
			},
		events:{
				"onReady":onPlayerReady,
				"onStateChange":onPlayerStateChange
			}
	});
}

function trClickAction(elem){
	var trindexplaying = elem.data('trindex');

	var owlkaraoke = $("#owlkaraoke");
	
	$("#videos_datatable tbody tr.playing, #karaoketitlelist li.playing, #owlkaraoke li.playing, #karaokedesclist li.playing").removeClass('playing');
	
	$("#videos_datatable tbody").find('tr[data-trindex="' + trindexplaying + '"]').addClass('playing');
	
	$("#karaoketitlelist").find('li[data-trindex="' + trindexplaying + '"]').addClass('playing');
	
	$("#owlkaraoke").find('li[data-trindex="' + trindexplaying + '"]').addClass('playing');
	
	$("#karaokedesclist").find('li[data-trindex="' + trindexplaying + '"]').addClass('playing');
	
	$("#owlkaraoke li").each(function(){
		if($(this).hasClass("playing")){
			owlkaraoke.trigger("owl.goTo", $("#owlkaraoke li").index(this));
		}
	});
}

function onPlayerReady(event){

	//load the first video to be cued
	//var firstCuedVid = $("#videos_datatable tbody tr").eq(0).data("videoid");
	var firstCuedVid = $("#videos_datatable tbody tr").has('img').first().data("videoid");
	event.target.cueVideoById(firstCuedVid);
	
	$("#videos_datatable tbody tr").each(function(){
		//get the videoid from each tr
		var trvideoid = $(this).data("videoid");
		
		$(this).on("click", "td img", function(){
			trClickAction($(this).closest('tr'));
			//play the video on the player
			event.target.loadVideoById(trvideoid);
			//animate the webpage
			$("html, body").animate({
				scrollTop: $("#video-player-container").offset().top 
			},500);
		});
		$(this).on("click", "td.strong", function(){
			trClickAction($(this).closest('tr'));
			//play the video on the player
			event.target.loadVideoById(trvideoid);
			//animate the webpage
			$("html, body").animate({
				scrollTop: $("#video-player-container").offset().top 
			},500);
		});
	});
	
	$("#karaoketitlelist li").each(function(){
		if ($(this).data("videoid") == firstCuedVid){
			$("#karaoketitlelist li.playing").removeClass('playing');
			$(this).addClass('playing');
		}
	});
	
	//declare dataTable variable
	var videos_datatable = $("#videos_datatable").DataTable();
	
	videos_datatable.on("draw.dt", function(){
		//cue the first video on DataTable draw
		var firstCuedVid = $("#videos_datatable tbody tr").has('img').first().data("videoid");
		event.target.cueVideoById(firstCuedVid);
		
		$("#videos_datatable tbody tr").each(function(){
			//get the videoid from each tr
			var trvideoid = $(this).data("videoid");
			
			$(this).on("click", "td img", function(){
				trClickAction($(this).closest('tr'));
				//play the video on the player
				event.target.loadVideoById(trvideoid);
				//animate the webpage
				$("html, body").animate({
					scrollTop: $("#video-player-container").offset().top 
				},500);
			});
			$(this).on("click", "td.strong", function(){
				trClickAction($(this).closest('tr'));
				//play the video on the player
				event.target.loadVideoById(trvideoid);
				//animate the webpage
				$("html, body").animate({
					scrollTop: $("#video-player-container").offset().top 
				},500);
			});
		});
	
		$("#karaoketitlelist li").each(function(){
			if ($(this).data("videoid") == firstCuedVid){
				$("#karaoketitlelist li.playing").removeClass('playing');
				$(this).addClass('playing');
			}
		});
		
		$("#karaokedesclist li").each(function(){
			if ($(this).data("videoid") == firstCuedVid){
				$(this).addClass('playing');
			}
			else{
				$(this).removeClass('playing');
			}
		});
	});
	
	$("#karaokedesclist li").each(function(){
		if ($(this).data("videoid") == firstCuedVid){
			$(this).addClass('playing');
		}
		else{
			$(this).removeClass('playing');
		}
	});
	
	//hide or show the
	//info buttons on player Ready
	$("#showinfo").show();
	$("#hideinfo").hide();
	$("#karaokedesclist").hide();
	
	//hide or show the
	//info buttons on resize
	$(window).resize(function(){
		$("#showinfo").show();
		$("#hideinfo").hide();
		$("#karaokedesclist").hide();
	});
	
	//onclick, show descrip list
	$("#showinfo").click(function(){
		$(this).hide();
		$("#hideinfo").show();
		$("#karaokedesclist").show();
	});
	
	//onclick, hide descrip list
	$("#hideinfo").click(function(){
		$(this).hide();
		$("#showinfo").show();
		$("#karaokedesclist").hide();
	});
}

function onPlayerStateChange(event){
	//if the video is PLAYING
	if(event.data === 1){
		//get the YouTube URL of the video playing
		var vidurl = event.target.getVideoUrl();
		//extract the video_id
		regex = /v=([\w-]{11})/;
		var vidIdFrURI = vidurl.match(regex)[1];
		
		$("#videos_datatable tbody tr").each(function(){
			if(vidIdFrURI === $(this).data("videoid")){
				$("#videos_datatable tbody tr.playing").removeClass('playing');
				$(this).addClass("playing");
			}
		});
		
		$("#karaoketitlelist li").each(function(){
			if ($(this).data("videoid") == vidIdFrURI){
				$("#karaoketitlelist li.playing").removeClass('playing');
				$(this).addClass('playing');
			}
		});
		
		//show or hide the karaokedesclist li item
		//depending on the index of the video
		//in the player
		$("#karaokedesclist li").each(function(){
			if ($(this).data("videoid") == vidIdFrURI){
				$(this).addClass('playing');
			}
			else{
				$(this).removeClass('playing');
			}
		});
		
		//hide or show the
		//info buttons on player Ready
		$("#showinfo").show();
		$("#hideinfo").hide();
		$("#karaokedesclist").hide();
		
		//hide or show the
		//info buttons on resize
		$(window).resize(function(){
			$("#showinfo").show();
			$("#hideinfo").hide();
			$("#karaokedesclist").hide();
		});
		
		//onclick, show descrip list
		$("#showinfo").click(function(){
			$(this).hide();
			$("#hideinfo").show();
			$("#karaokedesclist").show();
		});
		
		//onclick, hide descrip list
		$("#hideinfo").click(function(){
			$(this).hide();
			$("#showinfo").show();
			$("#karaokedesclist").hide();
		});
		
		//add or remove highlight class to owlhotel li elements
		//depending on video id
		$("#owlkaraoke li").each(function(){
			if ($(this).data("videoid") == vidIdFrURI){
				$(this).addClass("playing");
			}
			else{
				$(this).removeClass("playing");
			}
		});
		
	}
	
	//if the video is PAUSED
	if(event.data === 2){
		//get the YouTube URL of the video playing
		var vidurl = event.target.getVideoUrl();
		//extract the video_id
		regex = /v=([\w-]{11})/;
		var vidIdFrURI = vidurl.match(regex)[1];
		
		$("#videos_datatable tbody tr").each(function(){
			if(vidIdFrURI === $(this).data("videoid")){
				$("#videos_datatable tbody tr.playing").removeClass('playing');
				$(this).addClass('playing');
			}
		});
		
		//make the owlCarousel "goto"
		//the highlighted owlhotel li item
		var owlkaraoke = $("#owlkaraoke");
		$("#owlkaraoke li").each(function(){
			if($(this).hasClass("playing")){
				owlkaraoke.trigger("owl.goTo", $("#owlkaraoke li").index(this));
			}
		});
	}
	
	//if the video has ENDED
	if(event.data === 0){
		//get the YouTube URL of the video playing
		var vidurl = event.target.getVideoUrl();
		//extract the video_id
		regex = /v=([\w-]{11})/;
		var vidIdFrURI = vidurl.match(regex)[1];
		//get the last table row
		var endOfTR = ($("#videos_datatable tbody tr").length) - 1;
		
		$("#videos_datatable tbody tr").each(function(){
			if(vidIdFrURI === $(this).data("videoid")){
				var thisIndex = $(this).index();
				$(this).removeClass('playing');
				if($(this).index() === endOfTR){
					var firstTr = $(this).first().attr("data-videoid");
					event.target.cueVideoById(firstTr);
				} else {
					var nextTr = $(this).next().attr("data-videoid");
					console.info(nextTr);
					event.target.loadVideoById(nextTr);
				}
			}
		});
	}
	
}