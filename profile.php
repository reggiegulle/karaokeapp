<?php
require_once 'includes/init.php';

$user = new User();
	
if (!$user->isLoggedIn()){
	Redirect::to('index.php');
} else {

	if(!$username = Input::get('user')){
		Redirect::to('index.php');
	} else {
		//echo $username;
		$user = new User($username);
		if(!$user->exists()){
			Redirect::to(404);
		} else {
			//echo 'exists';
			$data = $user->data();
		}
		?>
		
		<h3><?php echo escape($data->username); ?></h3>
		<p>Full Name: "<?php echo escape($data->name); ?>"</p>
		
		<?php
	}
	
}

?>