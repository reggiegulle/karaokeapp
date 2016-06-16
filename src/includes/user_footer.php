            <footer id="footer" class="gradient">
				<ul id="footer-ul">
					<li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
					<li><p>Design and UI by</p><h3>Reggie Gulle</h3></li>
					<li><p>All Rights Reserved <?php echo date("Y", time()); ?></p></li>
                    <li>
                        <?php
                            if(!$user->isLoggedIn()){
                        ?>
                            <h5><a href="login.php">Registered Users Login</a></h5>
                        <?php
                            }

                            if($user->isLoggedIn() && $user->hasPermission('admin')){
                        ?>
                                <h5><a href="manage_users.php">Administer Users</a></h5>

                        <?php
                            }

                            if($user->isLoggedIn()){
                        ?>	
                                <article id="logout"><a href="logout.php"><p>Logout</p></a></article>
                        <?php
                            }
                        ?>
                    </li>
				</ul>
			</footer>
        </section>
	</body>
</html>