<?php
	require_once 'includes/init.php';
	
	$user = new User();
	
	if ($user->isLoggedIn()){
		$user->logout();
		
		Redirect::to('index.php');
	} else {
		Redirect::to('index.php');
	}
?>