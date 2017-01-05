<?php

require_once 'includes/init.php';

$user = new User();

	//if $user not logged in,
	//back to index.php	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} 
	
	if(!$user->hasPermission('admin') || !$user->exists()){
		Redirect::to('index.php');
	}
	
	$karaoke_user_to_be_edited = new User($_GET['id']);
	$karaoke_user_data = $karaoke_user_to_be_edited->data();

    foreach($_POST as $key => $value){
        ${$key} = $value;
    }

	if(Input::exists()){
		//echo 'OK!';
		$validate = new Validate();
		$validation = $validate->check($_POST, [
			'username'	=> [
				'required'	=> true,
				'min'		=> 2,
				'max' 		=> 20,
				'editnotduplicate'	=> 'users'
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
				$karaoke_user_to_be_edited->update([
					'username'	=>	Input::get('username'),
					'name' => Input::get('name'),
					'password' => Hash::make(Input::get('password'), $salt),
					'salt' => $salt	
				], $karaoke_user_data->id);
				
				Session::flash('edit_karaokeuser_success', 'User details have been updated.');
				
			} catch(Exception $e){
				die($e->getMessage());
			}
		}
	}
?>

<?php
	
	$pageTitle = "Edit User";

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
                    <h2 class="col-xs-12 col-sm-11 col-sm-offset-1">Edit User Profile Details:</h2>

                    <p class="col-xs-12 col-sm-10 col-sm-offset-1">To modify the user's existing details, fill-in the user's new details in the fields below.  Then type the user's reset password in the field provided and click "Submit".</p>

                    <article class="col-xs-12 col-sm-10 col-sm-offset-1 feedback-notif">
                        <?php
                            if(Session::exists('edit_karaokeuser_success')){
                                echo '<p>' . Session::flash('edit_karaokeuser_success') . '</p>';
                            }
                        ?>
                    </article>


                    <form action="" method="POST"  class="col-xs-12 col-sm-11 col-sm-offset-1">
                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('username')){
                                        echo '<p>' . Session::flash('username') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="username" class="col-xs-12">Username</label>
                            <br />
                            <input type="text" class="col-xs-10 col-sm-8" name="username" value="<?php echo '' . isset($username) ? html_entity_decode($username) : escape($karaoke_user_data->username); ?>" />
                        </div>

                        <div class="field">
                            <article class="col-xs-12 feedback-notif">  
                                <?php
                                    if(Session::exists('name')){
                                        echo '<p>' . Session::flash('name') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="name" class="col-xs-12">User's Real Name</label>
                            <br />
                            <input type="text" name="name" id="name" value="<?php echo '' . isset($name) ? html_entity_decode($name) : escape($karaoke_user_data->name); ?>" class="col-xs-10 col-sm-8" />
                        </div>

                        <div class="field">
                            <article class="col-xs-12 feedback-notif"> 
                                <?php
                                    if(Session::exists('password')){
                                        echo '<p>' . Session::flash('password') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="password" class="col-xs-12">Password</label>
                            <input type="password" name="password" id="password" autocomplete="off" value="" class="col-xs-8 col-sm-8"  />
                        </div>	

                        <div class="col-xs-12 field">
                            <input type="submit" value="Submit" class="col-xs-4 col-sm-2" />
                            <input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
                            <a class="col-xs-3 col-sm-2 cancel-button" href="manage_users.php">Cancel</a>
                        </div>
                    </form>

                </section>

            </div>
            
        </div>
    
    </section>

<?php
	include_once "includes/user_footer.php";
?>