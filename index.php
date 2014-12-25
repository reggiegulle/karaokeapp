<?php
	require_once 'includes/init.php';
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT=""/>

<title>Karaoke</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<!--Separate css files to be minified in deployment-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/dataTables.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<link href="css/dataTables.responsive.css" rel="stylesheet" type="text/css" media="screen">


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
	
	
	
	<article>
		<?php
			if(Session::exists('register')){
				echo '<p>' . Session::flash('register') . '</p>';
			}
		?>
	</article>
	
	<article>
		<?php
			//$user = new User();
			if($user->isLoggedIn()){
		?>
				<p>Hello <a href="profile.php?user=<?php echo escape($user->data()->username); ?>"><?php echo escape($user->data()->username); ?>!</a></p>
				
				<article id="logout"><a href="logout.php"><p>Logout</p></a></article>
				
		<?php
				if($user->hasPermission('admin')){
					echo '<p>You are an administrator!</p>';
				}
				if($user->hasPermission('moderator')){
					echo '<p>You are a moderator!</p>';
				}
				/* if(!$user->hasPermission('admin')){
					Redirect::to('404.php');
				} */
			}
		?>
		
	</article>
	
	<section id="video-player-container">
		<article id="player"></article>
	</section>
	
	<?php
		if($user->isLoggedIn()){
	?>
			<article id="addnew"><a href="add_video.php"><p>Add New Video</p></a></article>
	<?php
		}
	?>
	
	<article>
	
	<table id="videos_datatable" class="table table-striped table-bordered dataTable no-footer" cellspacing="0" width="100%">
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
				<li>Powered by Youtube</li>
				<li><p>Design and UI by</p><h3>Reggie Gulle</h3></li>
				<li><p>All Rights Reserved 2014</li>
			</ul>
			<?php
				if(!$user->isLoggedIn()){
			?>
					<h5><a href="login.php">Administrator Login</a></h5>
			<?php
				}

				if($user->isLoggedIn() && $user->hasPermission('admin')){
			?>
					<h5><a href="register.php">Register New Admin</a></h5>
			
			<?php
				}
				
				if($user->isLoggedIn()){
			?>	
					<article id="logout"><a href="logout.php"><p>Logout</p></a></article>
			<?php
				}
			?>
		</article>
	</section>
	
	<!--YouTube JS -->
	<script src="js/youtube.js"></script>
	<!--Bootstrap JS -->
	<script src="js/bootstrap.min.js"></script>
</body>
</html>