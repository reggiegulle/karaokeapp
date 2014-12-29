<?php
	require_once 'includes/init.php';
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT=""/>

<title>Renegade Karaoke</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<!--Separate css files to be minified in deployment-->
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
<script src="https://code.jquery.com/jquery-1.11.1.js" type="text/javascript"></script>
<script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="js/dataTables.responsive.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.js" type="text/javascript"></script>
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
	<script type="text/javascript">
	$(document).ready(function(){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	});
	</script>
	<div id="wrapper">
		<section id="header">
		
			<h1>Renegade Karaoke</h1>
		
			<article>
				<?php
					//$user = new User();
					if($user->isLoggedIn()){
				?>
						<p>Hello <a href="profile.php?user=<?php echo escape($user->data()->username); ?>"><?php echo escape($user->data()->username); ?>!</a></p>
						
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
						
						<article id="logout"><a href="logout.php"><p>Logout</p></a></article>
						
				<?php
						if($user->hasPermission('admin')){
							echo '<p>You are an administrator!</p>';
						}
						if($user->hasPermission('moderator')){
							echo '<p>You are a moderator!</p>';
						}
					}
				?>
				
			</article>
		</section>
	
	
	
		<section id="video-player-container">
			<article id="player"></article>
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
		
	
	
	
	
	<?php
		if($user->isLoggedIn()){
	?>
			<article>
				<?php
					if(Session::exists('delete')){
						echo '<p>' . Session::flash('delete') . '</p>';
					}
				?>
			</article>
			<article id="addnew"><a href="add_video.php"><p>Add New Video</p></a></article>
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
					</tr>
				</thead>
			</table>
		
		</article>
		
	</section>
	
	<?php
		if($user->isLoggedIn()){
	?>
			<article id="addnew"><a href="add_video.php"><p>Add New Video</p></a></article>
	<?php
		}
	?>
	
		<section>
			<article id="footer">
				<ul id="footer-ul">
					<li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
					<li><p>Design and UI by</p><h3>Reggie Gulle</h3></li>
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
	</div>
</body>
</html>