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
					echo $error . '<br />';
				}
		}
		
	}
}
?>

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
		<label for="name">Username</label>
		<input type="text" name="username" value="<?php echo escape($data->username); ?>" />

		<label for="name">Full Name</label>
		<input type="text" name="name" value="<?php echo escape($data->name); ?>" />
		
		<label for="password">Password</label>
		<input type="password" name="password" id="password" autocomplete="off" value="" />
		
		<input type="submit" value="Submit" />
		<input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />

</form>

<p><a href="changepassword.php?user=<?php echo escape($user->data()->username); ?>">Click here</a> if you want to change your password.</p>