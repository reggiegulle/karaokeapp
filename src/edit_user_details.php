<?php

    require_once 'includes/init.php';

    $user = new User();

    //if $user not logged in,
    //back to index.php	
    if (!$user->isLoggedIn()){
        Redirect::to('index.php');
    } else if ($user->isLoggedIn()) {

        $data = $user->data();

        if(!$user_id = Input::get('id')){
            Redirect::to('index.php');
        } else {
            if ($user_id !== $data->id) {
                Redirect::to('index.php');    
            }
        }
    }

    foreach($_POST as $key => $value){
        ${$key} = $value;
    }

    if(Input::exists()){
        if(Token::check(Input::get('token'))){
            $validate = new Validate();
            $validation = $validate->check($_POST, [
                'username' =>[
                    'required' => true,
                    'min' => 2,
                    'max' => 50,
                    'editnotduplicate'	=> 'users'
                ],
                'name' =>[
                    'required' => true,
                    'min' => 2,
                    'max' => 50
                ]
            ]);

            if($validation->passed()){
                if(Hash::make(Input::get('password'), $data->salt) !== $data->password){
                    Session::flash('edit_user_pwd_error', 'Password is blank/incorrect.');
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

            }
        }
    }
?>

<?php
	
	$pageTitle = "Edit Your Profile";

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
                    <h2 class="col-xs-12 col-sm-11 col-sm-offset-1">Edit Your Profile Details:</h2>

                    <p class="col-xs-12 col-sm-11 col-sm-offset-1">To modify your existing details, fill-in your new details in the fields below.  Then type your password in the field provided and click "Submit".</p>

                    <form action="" method="POST" class="col-xs-12 col-sm-11 col-sm-offset-1">
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                                if(Session::exists('username')){
                                    echo '<p>' . Session::flash('username') . '</p>';
                                }
                            ?>
                        </article>
                        <label for="name" class="col-xs-12">Username</label>
                        <input type="text" name="username" value="<?php echo '' . isset($username) ? html_entity_decode($username) : escape($data->username); ?>" class="col-xs-8 col-sm-8" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                                if(Session::exists('name')){
                                    echo '<p>' . Session::flash('name') . '</p>';
                                }
                            ?>
                        </article>
                        <label for="name" class="col-xs-12">Full Name</label>
                        <input type="text" name="name" value="<?php echo '' . isset($name) ? html_entity_decode($name) : escape($data->name); ?>" class="col-xs-8 col-sm-8" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                                if(Session::exists('password')){
                                    echo '<p>' . Session::flash('password') . '</p>';
                                }
                            ?>
                        </article>
                        <article class="col-xs-12 feedback-notif">
                            <?php
                                if(Session::exists('edit_user_pwd_error')){
                                    echo '<p>' . Session::flash('edit_user_pwd_error') . '</p>';
                                }
                            ?>
                        </article>
                        <label for="password" class="col-xs-12">Password</label>
                        <input type="password" name="password" id="password" autocomplete="off" value="" class="col-xs-8 col-sm-8" />
                    </div>
                    <div class="col-xs-12 field">	
                        <input type="submit" value="Submit" class="col-xs-4 col-sm-2"/>
                        <input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
                        <a class="col-xs-3 col-sm-2 cancel-button" href="index.php">Cancel</a>
                    </div>
                    </form>
                    <p class="col-xs-12 col-sm-11 col-sm-offset-1"><a href="changepassword.php?user=<?php echo escape($user->data()->username); ?>">Click/tap here</a> if you want to change your password.</p>
                </section>
                
            </div>
            
        </div>
        
    </section>
<?php
	include_once "includes/user_footer.php";
?>