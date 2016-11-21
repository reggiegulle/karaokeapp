<?php

    require_once 'includes/init.php';

    $user = new User();

    //if $user not logged in,
    //back to index.php	
    if (!$user->isLoggedIn()){
        Redirect::to('index.php');
    } else if ($user->isLoggedIn()) {

        $data = $user->data();

        if(!$username = Input::get('user')){
            Redirect::to('index.php');
        } else {
            if ($username !== $data->username) {
                Redirect::to('index.php');    
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
    
    <section class="min-height-box">
        
        <div class="container">

            <div class="row">

                <section id="user_panel_normal" class="user_panel col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
                    <h2 class="col-xs-12 col-sm-11 col-sm-offset-1">Your Profile Details:</h2>

                    <p class="col-xs-12 col-sm-11 col-sm-offset-1">Username: <strong>"<?php echo escape($data->username); ?>"</strong></p>
                    <p class="col-xs-12 col-sm-11 col-sm-offset-1">Full Name: <strong>"<?php echo escape($data->name); ?>"</strong></p>

                    <p class="col-xs-12 col-sm-11 col-sm-offset-1"><a href="edit_user_details.php?id=<?php echo escape($data->id); ?>">Click/tap here</a> if you want to change your profile details.</p>
                </section>

            </div>

        </div>
        
    </section>
		
<?php
	include_once "includes/user_footer.php";
?>