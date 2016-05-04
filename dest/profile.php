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

<?php
	
	$pageTitle = "User Profile";

	include_once "includes/user_htmlHead.php";
?>
<body>
<?php
	include_once "includes/user_section_header.php";
?>
		
		<div id="wrapper">
			<article id="user_panel_normal" class="user_panel">

				<article>
					<?php
						if(Session::exists('edit_user_success')){
							echo '<p>' . Session::flash('edit_user_success') . '</p>';
						}
					?>
				</article>

				<h5>User Profile:</h5>

				<p>Username: <strong>"<?php echo escape($data->username); ?>"</strong></p>
				<p>Full Name: <strong>"<?php echo escape($data->name); ?>"</strong></p>

				<p><a href="edit_user_details.php?id=<?php echo escape($data->id); ?>">Click here</a> if you want to change your profile details.</p>
			</article>
		</div>
		
<?php
	include_once "includes/user_footer.php";
?>