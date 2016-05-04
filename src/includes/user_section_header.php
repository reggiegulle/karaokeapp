<section id="header">	
	<h1>
        <a id="masthead" href="index.php">Renegade Karaoke</a>
    </h1>

<?php
    //$user = new User();
    if($user->isLoggedIn()){
?>		
    <article id="user_panel_index" class="row user_panel">
        <ul id="user_panel_index_user_creds" class="col-xs-12 col-sm-8">
            <li id="username">
                Hello
                    <span class="strong underline">
                        <a href="profile.php?user=<?php echo escape($user->data()->username); ?>">
                            <?php echo escape($user->data()->username);?>
                        </a>
                    </span>!
            </li>
    <?php
        if($user->hasPermission('admin')){
            echo '<li class="credential">You are an administrator!</li>';
        }
        if($user->hasPermission('moderator')){
            echo '<li class="credential">You are a moderator!</li>';
        }
    ?>
        </ul>
        <div id="logout" class="col-xs-12 col-sm-4">
            <a href="logout.php">Logout</a>
        </div>                
    <?php
        if(Session::exists('edit_user_success')){
            echo '<div class="col-xs-12">' . Session::flash('edit_user_success') . '</div>';
        }

        if(Session::exists('edit_user_pwd_success')){
            echo '<div class="col-xs-12">' . Session::flash('edit_user_pwd_success') . '</div>';
        }
    ?>
    </article>
<?php
    }
?>	
</section>
