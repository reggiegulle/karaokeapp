$(document).ready(function(){
    
    /* 
    * utility function for
    * window resize Event
    * Code from this StackOverflow answer: http://stackoverflow.com/a/4541963/34155
    */
    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "failedID";
            }
            if (timers.uniqueId) {
                clearTimeout(timers.uniqueId);
            }
            timers.uniqueId = setTimeout(callback, ms);
        };
    })();
    
	
	
	var mastheadAnim = new TimelineLite();
	
	mastheadAnim
		.fromTo( "#masthead", 0.25, {opacity: "0", color:"rgb(89, 66, 49)", textShadow: "rgb(255, 255, 255) -1px -1px 1px, rgb(255, 255, 0) -1px -1px 1px, rgb(255, 128, 0) 1px 1px 1px, rgb(255, 0, 0) 1px 2px 1px"}, {opacity: 0.3} )
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
		.set( "#masthead", {opacity: 1}, "+=10" )
		.call(animRestart);
	
	function animRestart(){
		mastheadAnim.restart(true);
	}
    
    $("#karaoke-player-container").css({
		"height":($("#karaoke-player-container").width() * 0.609375) + "px"
	});
    
    $(window).resize(function (){
        waitForFinalEvent(function (){
            $("#karaoke-player-container").css({
                "height":($("#karaoke-player-container").width() * 0.609375) + "px"
            });    
        }, 250, 'karaoke-player-container-resize');       
    });

});