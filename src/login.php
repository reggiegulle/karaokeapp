<?php
	require_once 'includes/init.php';
	
	$user = new User();
	
	if ($user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
		if(Input::exists()){
			if(Token::check(Input::get('token'))){
			
				$validate = new Validate();
				$validation = $validate->check($_POST, [
					'username'	=>	['required'	=> true],
					'password'	=>	['required'	=> true]
				]);
				
				if($validation->passed()){
					//log user in
					$user = new User();
					
					$remember = (Input::get('remember') === 'on') ? true : false;
					$login = $user->login(Input::get('username'), Input::get('password'), $remember);
					
					if($login){
						Redirect::to('index.php');
					} else {
						//echo '<p class="error">Sorry, logging in failed.</p>';
						Session::put("login_fail", "Invalid username/password.  Please try again.");
					}
				}/* else {
					foreach($validation->errors() as $error){
						echo '<p class="error">' . $error . '</p><br />';
					}
				}*/
			
			}
		}
	}
?>

<?php
	
	$pageTitle = "Renegade Karaoke Login";

	include_once "includes/user_htmlHead.php";
?>
<body>
		
    <section id="wrapper" class="container">
    
        <section id="header">		
			<h1><a id="masthead" href="index.php">Renegade Karaoke</a></h1>
		</section>
        
        <section class="min-height-box">
            
            <section id="user_panel_login" class="user_panel">

                <article class="feedback-notif">
                    <?php
                        if(Session::exists('login_fail')){
                            echo '<p>' . Session::flash('login_fail') . '</p>';
                        }
                    ?>
                </article>

                <form class="row" action="" method="POST">
                    <div class="field">
                        <article class="feedback-notif">
                            <?php
                                if(Session::exists('username')){
                                    echo '<p>' . Session::flash('username') . '</p>';
                                }
                            ?>
                        </article>
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" autocomplete="off" value="" />
                    </div>
                    <div class="field">
                        <article class="feedback-notif">
                            <?php
                                if(Session::exists('password')){
                                    echo '<p>' . Session::flash('password') . '</p>';
                                }
                            ?>
                        </article>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" autocomplete="off" value="" />
                    </div>

                    <div class="field">
                        <label>
                            <input type="checkbox" name="remember" id="remember"/> Remember me
                        </label>
                    </div>

                    <input type="hidden" name="token" value="<?php echo Token::generate(); ?>" />
                    <input type="submit" value="Log In" />
                </form>
                
            </section>
            
        </section>
        
<?php
	include_once "includes/user_footer.php";
?>