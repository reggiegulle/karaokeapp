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
			if(!$username = Input::get('user')){
				Redirect::to('index.php');
			} else {
				//assign variable $user to the User Object
				$karaoke_user = new User($username);
				//check if $user exists in database
				if(!$karaoke_user->exists()){
					//if $user is not in database,
					//back to index.php
					Redirect::to('index.php');
				} else {
					$data = $karaoke_user->data();	
				}
			}
		}
	}

	if(Input::exists()){
		if(Token::check(Input::get('token'))){
			//echo 'OK!';
			$validate = new Validate();
			$validation = $validate->check($_POST, [
				'username'	=> [
					'required'	=> true,
					'min'		=> 2,
					'max' 		=> 20
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
					$karaoke_user->update([
						'username'	=>	Input::get('username'),
						'name' => Input::get('name'),
						'password' => Hash::make(Input::get('password'), $salt),
						'salt' => $salt	
					], $data->id);
					
					Session::flash('edit_karaokeuser_success', 'User details have been updated.');
					
				} catch(Exception $e){
					die($e->getMessage());
				}
			}else{
				//echo errors
				foreach($validation->errors() as $error){
						echo $error . '<br />';
					}
			}
			
		}
	}
?>

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
		<label for="name">Username</label>
		<input type="text" name="username" value="<?php echo escape($data->username); ?>" />

		<label for="name">User's Real Name</label>
		<input type="text" name="name" id="name" value="<?php echo escape($data->name); ?>" />
		
		<label for="password">Password</label>
		<input type="password" name="password" id="password" autocomplete="off" value="" />
		
		<input type="submit" value="Submit" />
		<input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />

</form>