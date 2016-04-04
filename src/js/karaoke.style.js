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
	
	$('#search_reset').hover(function () {
			var searchResetAnim = new TimelineLite();
			searchResetAnim.to('#search_reset', 0.25, {
				fontSize: '15px',
				paddingTop: '4px',
				paddingBottom: '4px',
				paddingLeft: '10px',
				paddingRight: '10px',
				marginLeft: '-2px',
				backgroundColor: '#D3D3D3',
				color: '#4C4C4C',
				textShadow: '0px 0px 0px #000, 0px 0px 0px #000',
				boxShadow: '0px 0px 0px 0px rgba(255, 255, 255, 0)',
				ease: Back.easeIn
			});
		}, function () {
		var searchResetAnim = new TimelineLite();
			searchResetAnim.to('#search_reset', 0.5, {
				fontSize: '14px',
				paddingTop: '2px',
				paddingBottom: '2px',
				paddingLeft: '8px',
				paddingRight: '8px',
				marginLeft: '0px',
				backgroundColor: '#000',
				color: '#FFF',
				textShadow: '1px 2px 1px #000, -1px -2px 1px #000',
				boxShadow: '1px -1px 3px 1px rgba(255, 255, 255, 0.7)',
				ease: Back.easeOut
		    });
	});
	
	$('#yadcf-filter--videos_datatable-6-reset, #yadcf-filter--videos_datatable-7-reset, #yadcf-filter--videos_datatable-8-reset').hover(function () {
		var filterResetAnim = new TimelineLite();
		filterResetAnim
			.to(this, 0.2, {
				background: '#D3D3D3',
				color: '#000',
				fontSize: '15px',
				paddingTop: '1px',
				paddingBottom: '1px',
				ease: Power1.easeIn
			});
	}, function(){
		var filterResetAnim = new TimelineLite();
		filterResetAnim.to(this, 0.2, {
				background: '#000',
				color: '#fff',
				fontSize: '14px',
				marginBottom: '0px',
				paddingTop: '2px',
				paddingBottom: '2px',
				ease: Power1.easeOut
		});
	
	});
	
	
});