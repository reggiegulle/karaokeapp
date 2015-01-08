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
		.fromTo( "#masthead", 0.25, {opacity: "0", color:"rgb(89, 66, 49)", textShadow: "rgb(255, 255, 255) -1px -1px 1px, rgb(255, 255, 0) -1px -1px 1px, rgb(255, 128, 0) 1px 1px 1px, rgb(255, 0, 0) 1px 2px 1px"}, {opacity: 0.3}, "+=1" )
		.to( "#masthead", 0.25, {opacity: "0"} )
		.to( "#masthead", 0.10, {opacity: "0.65"} )
		.to( "#masthead", 0.10, {opacity: "0.3", textShadow: "rgb(255, 255, 255) -1px -1px 1px, rgb(255, 255, 0) -1px -2px 2px, rgb(255, 128, 0) 1px 1px 3px, rgb(255, 0, 0) 1px 2px 3px"}, "+=0.1" )
		.to( "#masthead", 0.10, {opacity: "0.65"} )
		.to( "#masthead", 0.10, {opacity: "0.3"} )
		.to( "#masthead", 0.10, {opacity: "0.65"} )
		.to( "#masthead", 0.10, {opacity: "0.3"} )
		.to( "#masthead", 0.10, {opacity: "0.65"} )
		.to( "#masthead", 0.20, {opacity: "0.3"} )
		.to( "#masthead", 0.10, {opacity: "1"} )
		.to( "#masthead", 0.10, {opacity: "0", color:"rgb(245, 152, 81)", textShadow: "rgb(255, 255, 255) 0px -1px 4px, rgb(255, 255, 0) 0px -2px 10px, rgb(255, 128, 0) 0px -10px 20px, rgb(255, 0, 0) 0px -18px 40px"}, "+=0.1" )
		.to( "#masthead", 0.10, {opacity: "0.65"} )
		.to( "#masthead", 0.10, {opacity: "0"}, "+=0.1" )
		.to( "#masthead", 0.10, {opacity: "1"} )
		.set( "#masthead", {opacity: 1}, "+=30" )
		.call(animRestart);
	
	function animRestart(){
		mastheadAnim.restart(true);
	}
});