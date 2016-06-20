<?php
	require_once 'includes/init.php';
    $user = new User();
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="Description" CONTENT="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs. Now you can sing-along to karaoke anywhere, anytime, on any device absolutely free!  Bust your pipes, show them You've Got Talent and be your own Singing Idol!"/>
<link rel="canonical" href="http://www.renegade-karaoke.com" />
<!--Twitter-->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@reggiegulle">
<meta name="twitter:creator" content="@reggiegulle">
<meta name="twitter:creator:id" content="Reggie Gulle">
<meta name="twitter:title" content="Renegade Karaoke!">
<meta name="twitter:description" content="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs!">
<meta name="twitter:image:src" content="http://www.renegade-karaoke.com/images/king-and-queen-of-hearts-fb.jpg">
<meta name="twitter:image:alt" content="King-and-Queen-of-Hearts-Karaoke-image">
<!--FB OG-->
<meta property="og:type" content="website"/>
<meta property="og:title" content="Renegade Karaoke!"/>
<meta property="og:site_name" content="Renegade Karaoke"/>
<meta property="og:url" content="http://www.renegade-karaoke.com/"/>
<meta property="og:description" content="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs. Now you can sing-along to karaoke anywhere, anytime, on any device absolutely free!  Bust your pipes, show them You've Got Talent and be your own Singing Idol!"/>
<meta property="og:image" content="http://www.renegade-karaoke.com/images/king-and-queen-of-hearts-fb.jpg"/>
<meta property="og:image:type" content="image/jpeg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="fb:app_id" content="412347942245523"/>
<title>Renegade Karaoke</title>
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
<!--bxslider css-->
<link href="css/jquery.bxslider.min.css" rel="stylesheet" type="text/css" media="screen">
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
    <script src="js/html5shiv.min.js"></script>
<![endif]-->
<!--JS files to be minified in deployment-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<!--helper vars-->
<script type="text/javascript">
<?php
    if ($user->isLoggedIn()) {
        echo 'var registered = "green";';    
    } else if (!$user->isLoggedIn()) {
        echo 'var registered = "black";';
    }
?>     
</script>
<!--Bootstrap JS--> 
<script src="js/bootstrap.min.js" type="text/javascript"></script>
<!--datatables core-->
<script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.min.js" type="text/javascript"></script>
<script src="js/select.min.js" type="text/javascript"></script>
<!--datatables extensions-->
<script src="js/dataTables.responsive.min.js" type="text/javascript"></script>
<script src="js/responsive.bootstrap.min.js" type="text/javascript"></script>
<!-- bxslider JS -->
<script src="js/jquery.bxslider.min.js" type="text/javascript"></script>
<!--GSAP library-->
<script src="js/CSSPlugin.min.js" type="text/javascript"></script>
<script src="js/TweenLite.min.js" type="text/javascript"></script>
<script src="js/TimelineLite.min.js" type="text/javascript"></script>
<script src="js/EasePack.min.js" type="text/javascript"></script>
<!--custom JS-->
<script src="js/karaoke_table.min.js" type="text/javascript"></script>
<!--custom slick slider JS-->
<script src="js/karaoke_slider.min.js" type="text/javascript"></script>
<!--stylejs-->
<script src="js/karaoke.style.min.js" type="text/javascript"></script>
</head>
<body>
    <section id="wrapper">
        <div id="fb-root"></div>
        <script>
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=412347942245523&version=v2.0";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        </script>

        <div class="container">
            <section id="header">
                <h1>
                    <a id="masthead" href="index.php">Renegade Karaoke</a>
                </h1>
                <ul id="social-media-buttons" class="row gradient">
                    <li class="fb-like col-xs-6" data-href="http://www.renegade-karaoke.com/" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true" data-width="225px">
                    </li>
                    <li class="col-xs-6">
                        <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.renegade-karaoke.com/" data-text="Check out this site!" data-via="reggiegulle" data-size="large">Tweet</a>
                    </li>
                    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
                </ul>
                <?php
                    //$user = new User();
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



        <section id="karaoke-slider-1-container">
            <article id="karaoke-slider-1"></article>
            <div class="custom-bx-prev"></div>
            <div class="custom-bx-next"></div>
        </section>

        <section id="titlelist-container">
            <ul id="karaoketitlelist">
            </ul>
        </section>

        <article id="info-buttons">
            <ul>
                <li id="showinfo">SHOW INFO</li>
                <li id="hideinfo">HIDE INFO</li>
            </ul>
        </article>

        <section id="desclist-container">
            <ul id="karaokedesclist">
            </ul>
        </section>


        <section id="karaoke-slider-2-container">
            <ul id="karaoke-slider-2">	
            </ul>
        </section>

        <div class="bxslider-custom-page-turn-container row">
            <button id="prev-slider-page" class="col-xs-4 col-sm-2 bxslider-custom-page-turn gradient">Prev Page</button>
            <button id="next-slider-page" class="col-xs-4 col-xs-offset-8 col-sm-2 col-sm-offset-10 bxslider-custom-page-turn gradient">Next Page</button>
        </div>

        <?php
            if($user->isLoggedIn()){
        ?>
                <article class="addnew">
                    <?php
                        if(Session::exists('delete')){
                            echo '<p>' . Session::flash('delete') . '</p>';
                        }
                    ?>
                    <a href="add_video.php">Add New Video</a>
                </article>
        <?php
            }
        ?>

        <section id="videos_datatable_container" class="row">

            <article>

                <table id="videos_datatable" class="table table-bordered dataTable no-footer" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th>Song Title</th>
                            <th>ID</th>
                            <th>Performed By</th>
                            <th>Poster</th>
                            <th>Composer</th>
                            <th>Genre</th>
                            <th>Source Album</th>
                            <th>Year Of Release</th>
                            <th>Country Of Origin</th>
                            <th>Running Time</th>
                            <th>Lyrics</th>
                            <th>Added By</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Song Title</th>
                            <th>ID</th>
                            <th>Performed By</th>
                            <th>Poster</th>
                            <th>Composer</th>
                            <th>Genre</th>
                            <th>Source Album</th>
                            <th>Year Of Release</th>
                            <th>Country Of Origin</th>
                            <th>Running Time</th>
                            <th>Lyrics</th>
                            <th>Added By</th>
                        </tr>
                    </tfoot>
                </table>

            </article>

        </section>

        <?php
            if($user->isLoggedIn()){
        ?>		
                <article class="addnew">
                    <a href="add_video.php">Add New Video</a>
                </article>
        <?php
            }
        ?>
        </div>
        <footer id="footer" class="gradient">
            <ul id="footer-ul">
                <li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
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