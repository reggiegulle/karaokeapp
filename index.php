<?php
	require_once 'includes/init.php';
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs. Now you can sing-along to karaoke anywhere, anytime, on any device absolutely free!  Bust your pipes, show them You've Got Talent and be your own Singing Idol!"/>
<link rel="canonical" href="http://www.renegade-karaoke.com" />

<!--Twitter-->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@reggiegulle">
<meta name="twitter:creator" content="@reggiegulle">
<meta name="twitter:creator:id" content="Reggie Gulle">
<meta name="twitter:title" content="Renegade Karaoke!">
<meta name="twitter:description" content="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs!">
<meta name="twitter:image:src" content="http://www.renegade-karaoke.com/images/rk-fb-og.png">

<!--FB OG-->
<meta property="og:type" content="website"/>
<meta property="og:title" content="Renegade Karaoke!"/>
<meta property="og:site_name" content="Renegade Karaoke"/>
<meta property="og:url" content="http://www.renegade-karaoke.com/"/>
<meta property="og:description" content="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs. Now you can sing-along to karaoke anywhere, anytime, on any device absolutely free!  Bust your pipes, show them You've Got Talent and be your own Singing Idol!"/>
<meta property="og:image" content="http://www.renegade-karaoke.com/images/rk-fb-og.png"/>
<meta property="fb:app_id" content="412347942245523"/>

<title>Renegade Karaoke</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<!--Separate css files to be minified in deployment-->
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!--bootstrap css files-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<!--datatables-bootstrap integration css files-->
<link href="css/dataTables.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<!--datatables responsive plug-in css-->
<link href="css/responsive.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<!--Important owl-carousel stylesheet-->
<link href="css/owl.carousel.css" rel="stylesheet" type="text/css" media="screen">
<!-- Default owl-carousel Theme -->
<link href="css/owl.theme.css" rel="stylesheet" type="text/css" media="screen">
<!--Google Fonts-->
<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>
<!--Custom css-->
<link href="css/karaoke.main.css" rel="stylesheet" type="text/css" media="screen">

<!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->


<!--JS files to be minified in deployment-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js" type="text/javascript"></script>
<!--datatables core-->
<script src="js/jquery.dataTables.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.js" type="text/javascript"></script>
<script src="js/select.js" type="text/javascript"></script>

<!--datatables extensions-->
<script src="js/dataTables.responsive.js" type="text/javascript"></script>
<script src="js/responsive.bootstrap.js" type="text/javascript"></script>

<!--GSAP library-->
<script src="js/CSSPlugin.js" type="text/javascript"></script>
<script src="js/TweenLite.js" type="text/javascript"></script>
<script src="js/TimelineLite.js" type="text/javascript"></script>
<script src="js/EasePack.js" type="text/javascript"></script>
<!--custom JS-->
<?php 
	$user = new User();
	if($user->isLoggedIn()){
?>
		<script src="js/karaoke.admin.js" type="text/javascript"></script>
<?php
	} else {
?>
		<script src="js/karaoke.js" type="text/javascript"></script>
<?php
	}
?>

<!--owl-carousel jQuery plugin-->
<script src="js/owl.carousel.js" type="text/javascript"></script>
<!--stylejs-->
<script src="js/karaoke.style.js" type="text/javascript"></script>
<!--YouTube JS and Bootstrap JS at the bottom -->

</head>
<body>
	<div id="fb-root"></div>
	<script>
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=412347942245523&version=v2.0";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>


	<script type="text/javascript">
	$(document).ready(function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	});
	</script>
	<section id="header">
	
		<h1><a id="masthead" href="index.php">Renegade Karaoke</a></h1>
			<ul id="social-media-buttons" class="gradient">
				<li class="fb-like" data-href="http://www.renegade-karaoke.com/" data-layout="standard" data-action="like" data-show-faces="false" data-share="true" data-width="225px"></li>
				<li><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.renegade-karaoke.com/" data-text="Check out this site!" data-via="reggiegulle" data-size="large">Tweet</a></li>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
			</ul>
		
			<?php
				//$user = new User();
				if($user->isLoggedIn()){
			?>		
					<article id="user_panel_index">
				
						<p>Hello <a href="profile.php?user=<?php echo escape($user->data()->username); ?>"><span class="strong underline"><?php echo escape($user->data()->username); ?></a>!</span></p>
						
						<article>
							<?php
								if(Session::exists('edit_user_success')){
									echo '<p>' . Session::flash('edit_user_success') . '</p>';
								}
								
								if(Session::exists('edit_user_pwd_success')){
									echo '<p>' . Session::flash('edit_user_pwd_success') . '</p>';
								}
							?>
						</article>
					
			<?php
					if($user->hasPermission('admin')){
						echo '<p>You are an administrator!</p>';
					}
					if($user->hasPermission('moderator')){
						echo '<p>You are a moderator!</p>';
					}
			?>
					<article id="logout"><a href="logout.php"><p class="strong">Logout</p></a></article>
			
					</article>
			<?php
				}
			?>
			
	</section>



	<section id="video-player-container">
		<article id="player"></article>
	</section>
	
	<section id="titlelist-container">
		<ul id="karaoketitlelist">
		</ul>
	</section>
	
	<article id="info-buttons">
		<ul>
			<li id="showinfo">SHOW INFO</li>
			<li id="hideinfo">HIDE INFO</li>
		</ul>
	</article>
	
	<section id="desclist-container">
		<ul id="karaokedesclist">
		</ul>
	</section>


	<section id="owl-container">
		<ul id="owlkaraoke">	
		</ul>
	</section>
	
	<section id="search-container">
		<form>
			<div class="form-group">
				<label for="custom-search-input">Search for artist, song title, album, lyrics, etc.</label>
				<img src="images/search_icon.png" width="32px" height="32px" alt="search icon" id="search-icon" />
				<input type="text" id="custom-search-input" class="form-control input-sm" />
				<div id="search_reset" title="Reset Search">X</div>
			</div>
		</form>
	</section>
	
	<div class="container">
		<section class="navbar navbar-default">
			<section id="custom-filter-search-container" class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar-collapse-1" aria-expanded="false">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
				  <a class="navbar-brand" href="#">Filters</a>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-navbar-collapse-1">
					<ul id="custom-filter" class="nav navbar-nav col-xs-12">
						<li class="filter col-xs-12 col-sm-4 col-md-4">
							<select id="decade-filter">
								<option value="reset" selected>--Filter By Decade--</option>
								<option value="2010">2010s</option>
								<option value="2000">2000s</option>
								<option value="1990">1990s</option>
								<option value="1980">1980s</option>
								<option value="1970">1970s</option>
								<option value="1960">1960s</option>
								<option value="1950">1950s</option>
								<option value="1940">1940s</option>
							</select>
						</li>
						<li class="filter col-xs-12 col-sm-4 col-md-4">
							<select id="genre-filter">
								<option value="reset" selected>--Filter By Genre--</option>
								<?php
									//instantiate new Video_filter class
									$video_genre_instance = new Video_filter();
									//query the database	
									$video_genre_filter_query = $video_genre_instance->generate_vid_filter_opts('genre', 'videos');
									//get the data array obj
									$video_genre_filters = $video_genre_filter_query->data();
									//generate the option tags
									foreach($video_genre_filters as $video_genre_filter){
										echo '<option value="' . htmlentities($video_genre_filter->genre) . '">' . htmlentities($video_genre_filter->genre) . '</option>';
									}
								?>
							</select>
						</li>
						<li class="filter col-xs-12 col-sm-4 col-md-4">
							<select id="country-filter">
								<option value="reset" selected>--Filter By Country--</option>
								<?php
									//instantiate new Video_filter class
									$video_country_instance = new Video_filter();
									//query the database	
									$video_country_filter_query = $video_country_instance->generate_vid_filter_opts('country_of_origin', 'videos');
									//get the data array obj
									$video_country_filters = $video_country_filter_query->data();
									//generate the option tags
									foreach($video_country_filters as $video_country_filter){
										echo '<option value="' . htmlentities($video_country_filter->country_of_origin) . '">' . htmlentities($video_country_filter->country_of_origin) . '</option>';
									}
								?>
							</select>
						</li>
					</ul>
				</div>
			</section>
		</section>
		
	<?php
		if($user->isLoggedIn()){
	?>
			<article id="addnew" class="col-xs-12">
				<?php
					if(Session::exists('delete')){
						echo '<p>' . Session::flash('delete') . '</p>';
					}
				?>
				<a href="add_video.php"><p class="strong underline">Add New Video</p></a>
			</article>
	<?php
		}
	?>

	<section id="videos_datatable_container" class="row">

		<article>
		
			<table id="videos_datatable" class="table table-bordered dataTable no-footer" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>Index</th>
						<th>Performed By</th>
						<th>Composer</th>
						<th>Song Title</th>
						<th>Poster</th>
						<th>Source Album</th>
						<th>Year of Release</th>
						<th>Genre</th>
						<th>Country Of Origin</th>
						<th>Running Time</th>
						<th>Lyrics</th>
						<th>Added By</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th>Index</th>
						<th>Performed By</th>
						<th>Composer</th>
						<th>Song Title</th>
						<th>Poster</th>
						<th>Source Album</th>
						<th>Year of Release</th>
						<th>Genre</th>
						<th>Country Of Origin</th>
						<th>Running Time</th>
						<th>Lyrics</th>
						<th>Added By</th>
					</tr>
				</tfoot>
			</table>
		
		</article>
		
	</section>

	<?php
		if($user->isLoggedIn()){
	?>		
			<article id="addnew" class="col-xs-12">
				<a href="add_video.php"><p class="strong underline">Add New Video</p></a>
			</article>
	<?php
		}
	?>

		<section>
			<article id="footer">
				<ul id="footer-ul">
					<li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
					<li><p>All Rights Reserved <?php echo date("Y", time()); ?></p></li>
					<li>
						<?php
							if(!$user->isLoggedIn()){
						?>
								<h5><a href="login.php">Registered Users Login</a></h5>
						<?php
							}

							if($user->isLoggedIn() && $user->hasPermission('admin')){
						?>
								<h5><a href="manage_users.php">Administer Users</a></h5>
						
						<?php
							}
							
							if($user->isLoggedIn()){
						?>	
								<article id="logout"><a href="logout.php"><p>Logout</p></a></article>
						<?php
							}
						?>
					</li>
				</ul>
			</article>
		</section>
		<!--YouTube JS -->
	<?php 
		$user = new User();
		if($user->isLoggedIn()){
	?>
			<script src="js/youtube_reg_user.js" type="text/javascript"></script>
	<?php
		} else {
	?>
			<script src="js/youtube.js" type="text/javascript"></script>
	<?php
		}
	?>
		<!--Bootstrap JS -->
		<script src="js/bootstrap.js"></script>
	</div>
</body>
</html>