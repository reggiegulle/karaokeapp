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

function onPlayerReady(event){

	var playlistArray = [];

	//get the videoid from each tr
	$("#videos_datatable tbody tr").each(function(){
		var trvideoid = $(this).data("videoid");
		//console.log(trvideoid);
		//create first array playlist
		playlistArray.push(trvideoid);
	});

	//cue the playlist
	var playlistArrayJoin = playlistArray.join(",");
	player.cuePlaylist(playlistArrayJoin);
	//console.log(playlistArrayJoin);
	
	
	//declare dataTable variable
	var videos_datatable = $("#videos_datatable").DataTable();

	videos_datatable.on("draw.dt", function(){
		//remove all array elements
		//to clear playlist
		while(playlistArray.length > 0){
			playlistArray.pop();
		}
		
		//get the videoid from each tr
		$("#videos_datatable tbody tr").each(function(){
			var trvideoid = $(this).data("videoid");
			//console.log(trvideoid);
			//create first array playlist
			playlistArray.push(trvideoid);
		});

		//cue the playlist
		var playlistArrayJoin = playlistArray.join(",");
		player.cuePlaylist(playlistArrayJoin);
		
		//assign a click callback to each img element in the table
		//I don't know why this has to be declared twice
		$("#videos_datatable tbody tr td img").each(function(){
			$(this).click(function(){
				var playlistindex = $(this).closest("tr").attr("data-htmlindex");
				player.playVideoAt(playlistindex);
				$("html, body").animate({
					scrollTop: $("#video-player-container").offset().top 
				},500);
			});
		}); 
	});
	
 	//assign a click callback to each img element in the table
	//I don't know why this has to be declared twice
	$("#videos_datatable tbody tr td img").each(function(){
		$(this).click(function(){
			var playlistindex = $(this).closest("tr").attr("data-htmlindex");
			player.playVideoAt(playlistindex);
			$("html, body").animate({
				scrollTop: $("#video-player-container").offset().top 
			},500);
			console.log("I was clicked!" + playlistindex);
		});
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
	if (YT.PlayerState.PLAYING) {
	
		//get the value of the video index
		var playervideoindex = player.getPlaylistIndex();
		
		//show or hide the hoteldesc li item
		//depending on the index of the video
		//in the player
		$("#karaokedesclist li").each(function(){
			if ($(this).data("htmlindex") == playervideoindex){
				$(this).show();
			}
			else{
				$(this).hide();
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

}