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
            
            foreach($_POST as $key => $value){
                ${$key} = $value;
            }
            
			if(Input::exists()){

				if(Token::check(Input::get('token'))){
				
					$validate = new Validate();
					$validation = $validate->check($_POST, [
						'username'	=> [
							'required'	=> true,
							'min'		=> 2,
							'max' 		=> 20,
							'unique'	=> 'users'
						],
						'password'	=> [
							'required'	=> true,
							'min'		=> 6
						],
						'password_again' => [
							'required'	=> true,
							'matches'	=> 'password'
						],
						'name' => [
							'required'	=> true,
							'min'		=> 2,
							'max'		=> 50
						],
						'group' => [
							'required'	=> true
						]
					]);
					
					if($validation->passed()){
						$new_user = new User();
						
						$new_user_name_input = Input::get('name');
						
						$salt = Hash::salt(32);
						
						try{
						
							$new_user->create([
								'username'	=> Input::get('username'),
								'password'	=> Hash::make(Input::get('password'), $salt),
								'salt'		=> $salt,
								'name'		=> Input::get('name'),
								'joined'	=> date('Y-m-d H:i:s'),
								'group'		=> Input::get('group')
							]);
                            
                            foreach($_POST as $key => $value){
                                ${$key} = '';
                            }
							
							Session::flash('register', $new_user_name_input . ' has been registered and can now log in!');
						} catch (Exception $e){
							die($e->getMessage());
						}
					}
				}
			}
		}
	}
?>

<!DOCTYPE html>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT=""/>

<title>Karaoke</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>


<!--Separate css files to be minified in deployment-->
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!--bootstrap css files-->
<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.min.css" rel="stylesheet" type="text/css" media="screen" />
<!--datatables-bootstrap integration css files-->
<link href="css/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" media="screen">
<!--datatables responsive plug-in css-->
<link href="css/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" media="screen">
<!--Google Fonts-->
<link href='http://fonts.googleapis.com/css?family=Anton|Roboto' rel='stylesheet' type='text/css'>
<!--Custom css-->
<link href="css/karaoke.main.min.css" rel="stylesheet" type="text/css" media="screen">
<!--[if gte IE 9]>
  <style type="text/css">
    .gradient {
       filter: none;
    }
  </style>
<![endif]-->
<!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
<![endif]-->
<!--JS files to be minified in deployment-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" type="text/javascript"></script>
<!--Bootstrap JS--> 
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<!--datatables core-->
<script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.min.js" type="text/javascript"></script>
<script src="js/dataTables.responsive.min.js" type="text/javascript"></script>
<script src="js/responsive.bootstrap.min.js" type="text/javascript"></script>
<!--GSAP library-->
<script src="js/CSSPlugin.min.js" type="text/javascript"></script>
<script src="js/TimelineLite.min.js" type="text/javascript"></script>
<script src="js/TweenLite.min.js" type="text/javascript"></script>
<script src="js/EasePack.min.js" type="text/javascript"></script>
<!--Custom JS for this Page-->
<script src="js/manage_users.min.js" type="text/javascript"></script>
<!--stylejs-->
<script src="js/karaoke.style.min.js" type="text/javascript"></script>
</head>

<body>

<?php
	include_once "includes/user_section_header.php";
?>

	<section class="min-height-box">
        
        <div class="container">
            
            <div class="row">

                <section id="user_panel_normal" class="user_panel col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                    <h1 class="col-xs-12">Manage Users Here:</h1>

                    <article class="col-xs-12 feedback-notif">
                        <?php
                            if(Session::exists('register')){
                                echo '<p>' . Session::flash('register') . '</p>';
                            }
                        ?>
                    </article>


                    <h4 class="col-xs-12">Register New User</h4>
                    <form action="" method="POST">
                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('username')){
                                        echo '<p>' . Session::flash('username') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="username" class="col-xs-12">Username</label>
                            <input type="text" class="col-xs-8 col-sm-5" name="username" id="username" value="<?php echo '' . isset($username) ? html_entity_decode($username) : '' . '';  ?>" autocomplete="off" />
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
                            <input type="text" class="col-xs-8 col-sm-5" name="name" id="name" value="<?php echo '' . isset($name) ? html_entity_decode($name) : '' . '';  ?>" />
                        </div>

                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('group')){
                                        echo '<p>' . Session::flash('group') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="group" class="col-xs-12">User Group</label>
                            <div class="col-xs-12">
                                <input type="radio" name="group" value="1" />Standard User
                                &nbsp;
                                <input type="radio" name="group" value="2" />Site Admin
                            </div>
                        </div>

                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('password')){
                                        echo '<p>' . Session::flash('password') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="password" class="col-xs-12">Choose a password</label>
                            <input type="password" class="col-xs-8 col-sm-5" name="password" id="password" value="" />
                        </div>

                        <div class="field">
                            <article class="col-xs-12 feedback-notif">
                                <?php
                                    if(Session::exists('password_again')){
                                        echo '<p>' . Session::flash('password_again') . '</p>';
                                    }
                                ?>
                            </article>
                            <label for="password_again" class="col-xs-12">Enter password again</label>
                            <input type="password" class="col-xs-8 col-sm-5" name="password_again" id="password_again" value="" />
                        </div>
                        
                        <div class="col-xs-12 field">
                            <input type="submit" value="Register"  class="col-xs-4 col-sm-2" />
                            <input type="hidden" name="token" value="<?php echo Token::generate() ?>" />
                        </div>

                    </form>

                    <article class="col-xs-12 feedback-notif">
                        <?php
                            if(Session::exists('delete_user')){
                                echo '<p>' . Session::flash('delete_user') . '</p>';
                            }
                        ?>
                    </article>
                </section>
	

                <table id="users_datatable" class="table table-bordered dataTable no-footer" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Joined</th>
                            <th>Group</th>
                        </tr>
                    </thead>
                </table>
                
            </div>
        
        </div>
        
    </section>

<?php
	include_once "includes/user_footer.php";
?>