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
			'username' =>[
				'required' => true,
				'min' => 2,
				'max' => 50
				],
			'name' =>[
				'required' => true,
				'min' => 2,
				'max' => 50
				]
		]);
		
		if($validation->passed()){
			if(Hash::make(Input::get('password'), $data->salt) !== $data->password){
				Session::flash('edit_user_pwd_error', 'Password is incorrect.');
			} else{
				//update
				try{
					$user->update([
						'username'	=>	Input::get('username'),
						'name' => Input::get('name')
					], $data->id);
					
					Session::flash('edit_user_success', 'Your details have been updated.');
					
				} catch(Exception $e){
					die($e->getMessage());
				}
			}
		
		}else{
			//echo errors
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
		<h1><a href="index.php">Renegade Karaoke User</a></h1>
	</section>
		
	<div id="wrapper">
		<article id="user_panel_normal">
			<p>Hello <a href="profile.php?user=<?php echo escape($data->username); ?>"><?php echo escape($data->username); ?>!</a></p>

			<p>To modify your existing details, fill-in your new details in the fields below.  Then type your password in the field provided and click "Submit".</p>

			<article>
				<?php
					if(Session::exists('edit_user_pwd_error')){
						echo '<p>' . Session::flash('edit_user_pwd_error') . '</p>';
					}
				?>
			</article>

			<form action="" method="POST">
				<div class="field">
					<label for="name">Username</label>
					<input type="text" name="username" value="<?php echo escape($data->username); ?>" />
				</div>
				<div class="field">
					<label for="name">Full Name</label>
					<input type="text" name="name" value="<?php echo escape($data->name); ?>" />
				</div>
				<div class="field">	
					<label for="password">Password</label>
					<input type="password" name="password" id="password" autocomplete="off" value="" />
				</div>
				<div class="field">	
					<input type="submit" value="Submit" />
					<input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
				</div>
			</form>

			<p><a href="changepassword.php?user=<?php echo escape($user->data()->username); ?>">Click here</a> if you want to change your password.</p>
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