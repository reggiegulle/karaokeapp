<section id="wrapper">
    
    <section id="header" class="container">	
        <h1>
            <a id="masthead" href="index.php">Renegade Karaoke</a>
        </h1>

    <?php
        if($user->isLoggedIn()){
    ?>		
        <article id="user_panel_index" class="row user_panel">
            <ul id="user_panel_index_user_creds" class="col-xs-12 col-sm-8">
                <li id="username">
                    Hello
                        <a href="profile.php?user=<?php echo escape($user->data()->username); ?>" class="strong">
                            <?php echo escape($user->data()->username);?>
                        </a>!
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
                <a href="logout.php" class="strong">Logout</a>
            </div>
            
            <article class="col-xs-12 feedback-notif">
        <?php
            if(Session::exists('edit_user_success')){
                echo '<p>' . Session::flash('edit_user_success') . '</p>';
            }

            if(Session::exists('edit_user_pwd_success')){
                echo '<p>' . Session::flash('edit_user_pwd_success') . '</p>';
            }
        ?>
            </article>
        </article>
    <?php
        }
    ?>	
    </section>
