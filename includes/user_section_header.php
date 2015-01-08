<section id="header">	
	<h1><a id="masthead" href="index.php">Renegade Karaoke</a></h1>

		<?php
			//$user = new User();
			if($user->isLoggedIn()){
		?>		
				<article id="user_panel_index">
			
					<p>Hello <a href="profile.php?user=<?php echo escape($user->data()->username); ?>"><span class="strong underline"><?php echo escape($user->data()->username); ?></a>!</span></p>
					
					<article>
						<?php
							if(Session::exists('edit_user_success')){
								echo '<p>' . Session::flash('edit_user_success') . '</p>';
							}
							
							if(Session::exists('edit_user_pwd_success')){
								echo '<p>' . Session::flash('edit_user_pwd_success') . '</p>';
							}
						?>
					</article>
				
		<?php
				if($user->hasPermission('admin')){
					echo '<p>You are an administrator!</p>';
				}
				if($user->hasPermission('moderator')){
					echo '<p>You are a moderator!</p>';
				}
		?>
				<article id="logout"><a href="logout.php"><p class="strong">Logout</p></a></article>
		
				</article>
		<?php
			}
		?>		
</section>
