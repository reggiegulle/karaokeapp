$(document).ready(function(){
	$("#video-player-container").css({
		"height":($("#video-player-container").width() * 0.609375) + "px"
	});
	
	$(window).resize(function(){
		$("#video-player-container").css({
			"height":($("#video-player-container").width() * 0.609375) + "px"
		});
	});

});