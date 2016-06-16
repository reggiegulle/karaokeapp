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

if(Input::exists()){
	if(Token::check(Input::get('token'))){
		//echo 'OK!';
		$validate = new Validate();
		$validation = $validate->check($_POST, [
			'password_current' => [
				'required' => true,
				'min' => 6
				],
			'password_new' => [
				'required' => true,
				'min' => 6
			],
			'password_new_again' => [
				'required' => true,
				'min' => 6,
				'matches' => 'password_new'
			]
		]);
		
		//if the validation passes
		if($validation->passed()){
			//change of password
			if(Hash::make(Input::get('password_current'), $data->salt) !== $data->password){
				Session::flash('edit_user_current_pwd_error', 'The current password you provided is incorrect.');
			} else{
				//echo 'OK!';
				$salt = Hash::salt(32);
				$user->update([
					'password' => Hash::make(Input::get('password_new'), $salt),
					'salt' => $salt
				], $data->id);
				
				Session::flash('edit_user_pwd_success', 'Your password has been changed.');
				Redirect::to('index.php');
			}
		
		} /*else {
			foreach($validation->errors() as $error){
				echo '<p>' . $error . '</p><br />';
			}
		}*/
	}
}

?>
<?php
	
	$pageTitle = "Change Password";

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

                   <h2 class="col-xs-12 col-sm-11 col-sm-offset-1">Edit Password:</h2>

                    <p class="col-xs-12 col-sm-11 col-sm-offset-1">To change your password, fill-in your current password in the field provided below.  Type and re-type your new password in each of the fields provided and click "Submit".</p>

                    <form action="" method="POST" class="col-xs-12 col-sm-11 col-sm-offset-1">

                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('password_current')){
                                        echo '<p>' . Session::flash('password_current') . '</p>';
                                    }
                                ?>
                            </article>
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('edit_user_current_pwd_error')){
                                        echo '<p>' . Session::flash('edit_user_current_pwd_error') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="password_current" class="col-xs-12">Current password</label>
                            <input type="password" name="password_current" id="password_current" class="col-xs-8 col-sm-8" />
                        </div>
                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('password_new')){
                                        echo '<p>' . Session::flash('password_new') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="password_new" class="col-xs-12">New password</label>
                            <input type="password" name="password_new" id="password_new" class="col-xs-8 col-sm-8" />
                        </div>
                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('password_new_again')){
                                        echo '<p>' . Session::flash('password_new_again') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="password_new_again" class="col-xs-12">Re-type your new password</label>
                            <input type="password" name="password_new_again" id="password_new_again" class="col-xs-8 col-sm-8" />
                        </div>
                        <div class="col-xs-12 field">	
                            <input type="submit" value="Change" class="col-xs-4 col-sm-2"/>
                            <input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
                            <a class="col-xs-3 col-sm-2 cancel-button" href="index.php">Cancel</a>
                        </div>

                    </form>
                    
                </section>
                
            </div>
            
        </div>
        
    </section>
    
<?php
	include_once "includes/user_footer.php";
?>