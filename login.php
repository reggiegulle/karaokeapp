<?php
	require_once 'includes/init.php';
	
	$user = new User();
	
	if ($user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
		if(Input::exists()){
			if(Token::check(Input::get('token'))){
			
				$validate = new Validate();
				$validation = $validate->check($_POST, [
					'username'	=>	['required'	=> true],
					'password'	=>	['required'	=> true]
				]);
				
				if($validation->passed()){
					//log user in
					$user = new User();
					
					$remember = (Input::get('remember') === 'on') ? true : false;
					$login = $user->login(Input::get('username'), Input::get('password'), $remember);
					
					if($login){
						Redirect::to('index.php');
					} else {
						echo '<p class="error">Sorry, logging in failed.</p>';
					}
				} else {
					foreach($validation->errors() as $error){
						echo '<p class="error">' . $error . '</p><br />';
					}
				}
			
			}
		}
	}
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT=""/>

<title>Renegade Karaoke Login</title>

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
			<article id="user_panel_login">
				<form action="" method="POST">
					<div class="field">
						<label for="username">Username</label>
						<input type="text" name="username" id="username" autocomplete="off" value="" />
					</div>
					<div class="field">
						<label for="password">Password</label>
						<input type="password" name="password" id="password" autocomplete="off" value="" />
					</div>
					
					<div class="field">
						<label for="remember">
							<input type="checkbox" name="remember" id="remember" /> Remember me
						</label>
					</div>
					
					<input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
					<input type="submit" value="Log In" />
				</form>
			</article>
			<article id="footer">
				<ul id="footer-ul">
					<li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
					<li><p>Design and UI by</p><h3>Reggie Gulle</h3></li>
					<li><p>All Rights Reserved 2014</p></li>					
				</ul>
			</article>
		</div>
	</body>
</html>