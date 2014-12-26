<?php
	require_once 'includes/init.php';

	$user = new User();
	
	if ($user->isLoggedIn() && $user->hasPermission('admin')){
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
					//output errors
					//print_r($validation->errors());
					foreach($validation->errors() as $error){
						echo $error, '<br />';
					}
				}
			}
		}
	} else {
		Redirect::to('index.php');
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


<!--JS files to be minified in deployment-->
<script src="https://code.jquery.com/jquery-1.11.1.js" type="text/javascript"></script>
<script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="js/dataTables.responsive.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.js" type="text/javascript"></script>
<!--Custom JS for this Page-->
</head>

<body>

	<article>
		<?php
			if(Session::exists('register')){
				echo '<p>' . Session::flash('register') . '</p>';
			}
		?>
	</article>


<h4>Register New User</h4>

<form action="" method="POST">
		<label for="username">Username</label>
		<input type="text" name="username" id="username" value="<?php echo escape(Input::get('username')); ?>" autocomplete="off" />
	
		<label for="password">Choose a password</label>
		<input type="password" name="password" id="password" value="" />
	
		<label for="password_again">Enter password again</label>
		<input type="password" name="password_again" id="password_again" value="" />
	
		<label for="name">User's Real Name</label>
		<input type="text" name="name" id="name" value="<?php echo escape(Input::get('name')); ?>" />
		
		<label for="group">User Group</label>
		<input type="radio" name="group" value="1" />Standard User
		&nbsp;
		<input type="radio" name="group" value="2" />Site Admin
	
	<input type="hidden" name="token" value="<?php echo Token::generate() ?>" >
	
	<input type="submit" value="Register" >

	
</form>
<article>
	<h5><a href="index.php">Cancel</a></h5>
</article>

