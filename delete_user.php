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
					try{
						$karaoke_user->delete([
							'username', '=' , Input::get('user')
						]);
						
						Session::flash('delete_user', 'User "' . $username . '" has been deleted from the database.');
						Redirect::to('manage_users.php');
					} catch (Exception $e){
						die($e->getMessage());
					}	
				}
			}
		}
	}
?>