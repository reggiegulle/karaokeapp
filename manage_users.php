<?php
	require_once 'includes/init.php';

	$user = new User();

	//if $user not logged in,
	//back to index.php	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
		if(!$user->hasPermission('admin') || !$user->exists()){
			Redirect::to('index.php');
		} else {
			if(Input::exists()){

				if(Token::check(Input::get('token'))){
				
					$validate = new Validate();
					$validation = $validate->check($_POST, [
						'username'	=> [
							'required'	=> true,
							'min'		=> 2,
							'max' 		=> 20,
							'unique'	=> 'users'
						],
						'password'	=> [
							'required'	=> true,
							'min'		=> 6
						],
						'password_again' => [
							'required'	=> true,
							'matches'	=> 'password'
						],
						'name' => [
							'required'	=> true,
							'min'		=> 2,
							'max'		=> 50
						]
					]);
					
					if($validation->passed()){
						$user = new User();
						
						$user_name_input = Input::get('name');
						
						$salt = Hash::salt(32);
						
						try{
						
							$user->create([
								'username'	=> Input::get('username'),
								'password'	=> Hash::make(Input::get('password'), $salt),
								'salt'		=> $salt,
								'name'		=> Input::get('name'),
								'joined'	=> date('Y-m-d H:i:s'),
								'group'		=> Input::get('group')
							]);
							
							Session::flash('register', $user_name_input . ' has been registered and can now log in!');
						} catch (Exception $e){
							die($e->getMessage());
						}
					} else {
						//echo errors
						foreach($validation->errors() as $error){
							echo '<p class="error">' . $error . '</p><br />';
						}
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

<title>Karaoke</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<!--Separate css files to be minified in deployment-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/dataTables.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<link href="css/dataTables.responsive.css" rel="stylesheet" type="text/css" media="screen">
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
<!--GSAP library-->
<script src="js/CSSPlugin.js" type="text/javascript"></script>
<script src="js/TweenLite.js" type="text/javascript"></script>
<script src="js/TimelineLite.js" type="text/javascript"></script>
<!--Custom JS for this Page-->
<script src="js/manage_users.js" type="text/javascript"></script>
<!--stylejs-->
<script src="js/karaoke.style.js" type="text/javascript"></script>
</head>

<body>

<?php
	include_once "includes/user_section_header.php";
?>

	<div id="wrapper">

		<article id="user_panel_normal">
			<article>
				<p>Hello <a href="profile.php?user=<?php echo escape($user->data()->username); ?>"><?php echo escape($user->data()->username); ?>!</a></p>
				
				<article id="logout"><a href="logout.php"><p>Logout</p></a></article>
			</article>

			<article>
				<?php
					if(Session::exists('register')){
						echo '<p>' . Session::flash('register') . '</p>';
					}
				?>
			</article>


			<h4>Register New User</h4>

			<form action="" method="POST">
				<div class="field">
					<label for="username">Username</label>
					<input type="text" name="username" id="username" value="<?php echo escape(Input::get('username')); ?>" autocomplete="off" />
				</div>
				
				<div class="field">
					<label for="name">User's Real Name</label>
					<input type="text" name="name" id="name" value="<?php echo escape(Input::get('name')); ?>" />
				</div>
				
				<div class="field">
					<label for="group">User Group</label>
					<input type="radio" name="group" value="1" />Standard User
					&nbsp;
					<input type="radio" name="group" value="2" />Site Admin
				</div>
				
				<div class="field">
					<label for="password">Choose a password</label>
					<input type="password" name="password" id="password" value="" />
				</div>
				
				<div class="field">
					<label for="password_again">Enter password again</label>
					<input type="password" name="password_again" id="password_again" value="" />
				</div>
				
				<div class="field">
					<input type="hidden" name="token" value="<?php echo Token::generate() ?>" >
				</div>
				
				<input type="submit" value="Register" >

				
			</form>
			<article>
				<h5><a href="index.php">Cancel</a></h5>
			</article>

			<article>
				<?php
					if(Session::exists('delete_user')){
						echo '<p>' . Session::flash('delete_user') . '</p>';
					}
				?>
			</article>
		</article>
	</div>

	<table id="users_datatable" class="table table-bordered dataTable no-footer" cellspacing="0" width="100%">
		<thead>
			<tr>
				<th>Index</th>
				<th>Username</th>
				<th>Name</th>
				<th>Joined</th>
				<th>Group</th>
			</tr>
		</thead>
	</table>

<?php
	include_once "includes/user_footer.php";
?>