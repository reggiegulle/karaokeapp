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
?>

<article>
	<?php
		if(Session::exists('edit_user_success')){
			echo '<p>' . Session::flash('edit_user_success') . '</p>';
		}
	?>
</article>

<h5>User Profile:</h5>

<p>Username: "<?php echo escape($data->username); ?>"</p>
<p>Full Name: "<?php echo escape($data->name); ?>"</p>

<p><a href="edit_user_details.php?user=<?php echo escape($data->username); ?>">Click here</a> if you want to change your profile details.</p>