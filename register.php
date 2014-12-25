<?php
	require_once 'includes/init.php';
	
if(Input::exists()){

	if(Token::check(Input::get('token'))){
	
		//echo 'I have been run';
	
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
			//register user
			/* Session::flash('success', 'You registered successfully!');
			header('Location: index.php'); */
			$user = new User();
			
			$salt = Hash::salt(32);
			
			try{
			
				$user->create([
					'username'	=> Input::get('username'),
					'password'	=> Hash::make(Input::get('password'), $salt),
					'salt'		=> $salt,
					'name'		=> Input::get('name'),
					'joined'	=> date('Y-m-d H:i:s'),
					'group'		=> 1
				]);
				
				Session::flash('home', 'You have been registered and can now log in!');
				Redirect::to('index.php');
			
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
?>


<form action="" method="POST">
	<div class="field">
		<label for="username">Username</label>
		<input type="text" name="username" id="username" value="<?php echo escape(Input::get('username')); ?>" autocomplete="off" />
	</div>
	
	<div class="field">
		<label for="password">Choose a password</label>
		<input type="password" name="password" id="password" value="" />
	</div>
	
	<div class="field">
		<label for="password_again">Enter your password again</label>
		<input type="password" name="password_again" id="password_again" value="" />
	</div>
	
	<div class="field">
		<label for="name">Your Name</label>
		<input type="text" name="name" id="name" value="<?php echo escape(Input::get('name')); ?>" />
	</div>
	
	<input type="hidden" name="token" value="<?php echo Token::generate() ?>" >
	
	<input type="submit" value="Register" >

	
</form>