<?php
require_once 'includes/init.php';

$user = new User();

//if $user not logged in,
//back to index.php	
if (!$user->isLoggedIn()){
	Redirect::to('index.php');
} else {
	
	if(!$username = Input::get('user')){
		Redirect::to('index.php');
	} else {
		//assign variable $user to the User Object
		$user = new User($username);
		//check if $user exists in database
		if(!$user->exists()){
			//if $user is not in database,
			//back to index.php
			Redirect::to('index.php');
		} else {
			$data = $user->data();	
		}
	}
}
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT=""/>

<title>Renegade Karaoke User</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>

<!--Google Fonts-->
<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>
<!--Separate css files to be minified in deployment-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<!--Custom css-->
<link href="css/karaoke.main.css" rel="stylesheet" type="text/css" media="screen">
</head>
<body>
		<section id="header">		
			<h1><a href="index.php">Renegade Karaoke</a></h1>
		</section>
		
		<div id="wrapper">
			<article id="user_panel_normal">

				<article>
					<?php
						if(Session::exists('edit_user_success')){
							echo '<p>' . Session::flash('edit_user_success') . '</p>';
						}
					?>
				</article>

				<h5>User Profile:</h5>

				<p>Username: "<?php echo escape($data->username); ?>"</p>
				<p>Full Name: "<?php echo escape($data->name); ?>"</p>

				<p><a href="edit_user_details.php?user=<?php echo escape($data->username); ?>">Click here</a> if you want to change your profile details.</p>
			</article>
		</div>
		<section>
		<article id="footer">
			<ul id="footer-ul">
				<li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
				<li><p>Design and UI by</p><h3>Reggie Gulle</h3></li>
				<li><p>All Rights Reserved 2014</p></li>
			</ul>
		</article>
	</section>
</body>
</html>