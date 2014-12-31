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

if(Input::exists()){
	if(Token::check(Input::get('token'))){
		//echo 'OK!';
		$validate = new Validate();
		$validation = $validate->check($_POST, [
			'password_current' => [
				'required' => true,
				'min' => 6
				],
			'password_new' => [
				'required' => true,
				'min' => 6
			],
			'password_new_again' => [
				'required' => true,
				'min' => 6,
				'matches' => 'password_new'
			]
		]);
		
		//if the validation passes
		if($validation->passed()){
			//change of password
			if(Hash::make(Input::get('password_current'), $data->salt) !== $data->password){
				Session::flash('edit_user_current_pwd_error', 'The current password you provided is incorrect.');
			} else{
				//echo 'OK!';
				$salt = Hash::salt(32);
				$user->update([
					'password' => Hash::make(Input::get('password_new'), $salt),
					'salt' => $salt
				], $data->id);
				
				Session::flash('edit_user_pwd_success', 'Your password has been changed.');
				Redirect::to('index.php');
			}
		
		} else {
			foreach($validation->errors() as $error){
				echo '<p class="error">' . $error . '</p><br />';
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

			<p>Hello <a href="profile.php?user=<?php echo escape($data->username); ?>"><?php echo escape($data->username); ?>!</a></p>

			<p>To change your password, fill-in your current password in the field provided below.  Type and re-type your new password in each of the fields provided and click "Submit".</p>

			<form action="" method="POST">

				<article>
					<?php
						if(Session::exists('edit_user_current_pwd_error')){
							echo '<p>' . Session::flash('edit_user_current_pwd_error') . '</p>';
						}
					?>
				</article>
				
				<div class="field">
					<label for="password_current">Current password</label>
					<input type="password" name="password_current" id="password_current" />
				</div>
				<div class="field">
					<label for="password_new">New password</label>
					<input type="password" name="password_new" id="password_new" />
				</div>
				<div class="field">
					<label for="password_new_again">Re-type your new password</label>
					<input type="password" name="password_new_again" id="password_new_again" />
				</div>
				<div class="field">	
					<input type="submit" value="Change" />
					<input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
				</div>

			</form>
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