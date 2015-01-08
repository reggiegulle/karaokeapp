$(document).ready(function(){
	$("#video-player-container").css({
		"height":($("#video-player-container").width() * 0.609375) + "px"
	});
	
	$(window).resize(function(){
		$("#video-player-container").css({
			"height":($("#video-player-container").width() * 0.609375) + "px"
		});
	});
	
	var mastheadAnim = new TimelineLite();
	
	mastheadAnim
		.fromTo( "#masthead", 0.25, {opacity: 0}, {opacity: 0.3}, "+=2" )
		.to( "#masthead", 0.25, {opacity: 0} )
		.to( "#masthead", 0.10, {opacity: 0.65} )
		.to( "#masthead", 0.10, {opacity: 0.3}, "+=0.1" )
		.to( "#masthead", 0.10, {opacity: 0.65} )
		.to( "#masthead", 0.10, {opacity: 0.3} )
		.to( "#masthead", 0.10, {opacity: 0.65} )
		.to( "#masthead", 0.10, {opacity: 0.3} )
		.to( "#masthead", 0.10, {opacity: 0.65} )
		.to( "#masthead", 0.20, {opacity: 0.3} )
		.to( "#masthead", 0.10, {opacity: 1} )
		.to( "#masthead", 0.10, {opacity: 0}, "+=0.1" )
		.to( "#masthead", 0.10, {opacity: 0.65} )
		.to( "#masthead", 0.10, {opacity: 0}, "+=0.1" )
		.to( "#masthead", 0.10, {opacity: 1} );
		
});