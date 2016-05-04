<?php

require_once 'includes/init.php';

$user = new User();

	//if $user not logged in,
	//back to index.php	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} 
	
	if(!$user->hasPermission('admin') || !$user->exists()){
		Redirect::to('index.php');
	}
	
	$karaoke_user_to_be_edited = new User($_GET['id']);
	$karaoke_user_data = $karaoke_user_to_be_edited->data();	

	if(Input::exists()){
		//echo 'OK!';
		$validate = new Validate();
		$validation = $validate->check($_POST, [
			'username'	=> [
				'required'	=> true,
				'min'		=> 2,
				'max' 		=> 20,
				'editnotduplicate'	=> 'users'
			],
			'password'	=> [
				'required'	=> true,
				'min'		=> 6
			],
			'name' => [
				'required'	=> true,
				'min'		=> 2,
				'max'		=> 50
			]
		]);
		
		if($validation->passed()){
			$salt = Hash::salt(32);
			//update
			try{
				$karaoke_user_to_be_edited->update([
					'username'	=>	Input::get('username'),
					'name' => Input::get('name'),
					'password' => Hash::make(Input::get('password'), $salt),
					'salt' => $salt	
				], $karaoke_user_data->id);
				
				Session::flash('edit_karaokeuser_success', 'User details have been updated.');
				
			} catch(Exception $e){
				die($e->getMessage());
			}
		}/*else{
			//echo errors
			foreach($validation->errors() as $error){
				echo '<p class="error">' . $error . '</p><br />';
			}
		}*/
	}
?>

<?php
	
	$pageTitle = "Edit User";

	include_once "includes/user_htmlHead.php";
?>
<body>
<?php
	include_once "includes/user_section_header.php";
?>

<div id="wrapper">

	<article id="user_panel_normal" class="user_panel">

		<p>Hello <a href="profile.php?user=<?php echo escape($user->data()->username); ?>"><?php echo escape($user->data()->username); ?>!</a></p>

		<p>To modify the user's existing details, fill-in the user's new details in the fields below.  Then type the user's reset password in the field provided and click "Submit".</p>

		<article>
			<?php
				if(Session::exists('edit_karaokeuser_success')){
					echo '<p>' . Session::flash('edit_karaokeuser_success') . '</p>';
				}
			?>
		</article>


		<form action="" method="POST">
			<div class="field">
				<article>
					<?php
						if(Session::exists('username')){
							echo '<p class="error">' . Session::flash('username') . '</p>';
						}
					?>
				</article>
				<label for="name">Username</label>
				<input type="text" name="username" value="<?php echo escape($karaoke_user_data->username); ?>" />
			</div>
			
			<div class="field">
				<article>
					<?php
						if(Session::exists('name')){
							echo '<p class="error">' . Session::flash('name') . '</p>';
						}
					?>
				</article>
				<label for="name">User's Real Name</label>
				<input type="text" name="name" id="name" value="<?php echo escape($karaoke_user_data->name); ?>" />
			</div>

			<div class="field">
				<article>
					<?php
						if(Session::exists('password')){
							echo '<p class="error">' . Session::flash('password') . '</p>';
						}
					?>
				</article>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" autocomplete="off" value="" />
			</div>	
				
			<div class="field">
				<input type="submit" value="Submit" />
				<input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
			</div>
		</form>
		
		<p>Back To: <a href="manage_users.php">Users Table</a></p>
	
	</article>

</div>

<?php
	include_once "includes/user_footer.php";
?>