<?php
	require_once 'includes/init.php';
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT="Now you can get your karaoke fix anywhere, anytime, on any device — absolutely free!  Bust your pipes and show them You've Got Talent and be your own Singing Idol.  See you soon!"/>

<meta property="og:type" content="website"/>
<meta property="og:title" content="Renegade Karaoke!"/>
<meta property="og:site_name" content="Renegade Karaoke"/>
<meta property="og:url" content="http://www.renegadekaraoke.byethost7.com/index.php"/>
<meta property="og:description" content="Now you can get your karaoke fix anywhere, anytime, on any device — absolutely free!  Bust your pipes and show them You've Got Talent and be your own Singing Idol.  See you soon!"/>
<meta property="og:image" content="http://www.renegadekaraoke.byethost7.com/images/rk-fb-og.png"/>
<meta property="fb:app_id" content="412347942245523"/>

<title>Renegade Karaoke</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<!--Separate css files to be minified in deployment-->
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/dataTables.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<link href="css/dataTables.responsive.css" rel="stylesheet" type="text/css" media="screen">
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js" type="text/javascript"></script>
<!--datatables-->
<script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="js/dataTables.responsive.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.js" type="text/javascript"></script>
<!--GSAP library-->
<script src="js/CSSPlugin.js" type="text/javascript"></script>
<script src="js/TweenLite.js" type="text/javascript"></script>
<script src="js/TimelineLite.js" type="text/javascript"></script>
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
<script src="js/owl.carousel.min.js" type="text/javascript"></script>
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
		<div class="fb-like" data-href="http://www.renegadekaraoke.byethost7.com" data-layout="standard" data-action="like" data-show-faces="false" data-share="true"></div>
	
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

	<section id="custom-filter-search-container" class="col-xs-12">
		<ul id="custom-filter-search">
			<li>Filter by Year</li>
			<li>Filter by Genre</li>
			<li>Filter by Country</li>
			<li>
				Search
				<input type="text" id="custom-search-box" />
			</li>
		</ul>
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

<section id="videos_datatable_container">

	<article>
	
		<table id="videos_datatable" class="table table-bordered dataTable no-footer" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>Index</th>
					<th>Song Title</th>
					<th>Composer</th>
					<th>Performed By</th>
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
				<li><p>All Rights Reserved 2014</p></li>
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
	<script src="js/youtube.js"></script>
	<!--Bootstrap JS -->
	<script src="js/bootstrap.min.js"></script>
</body>
</html>