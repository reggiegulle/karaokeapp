<?php
	require_once 'includes/init.php';
    $user = new User();
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="title" CONTENT="FREE Karaoke Anytime Anywhere | Renegade Karaoke!" />
<meta name="Description" CONTENT="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs. Now you can sing-along to karaoke anywhere, anytime, on any device absolutely free!  Bust your pipes, show them You've Got Talent and be your own Singing Idol!"/>
<link rel="canonical" href="http://www.renegade-karaoke.com" />
<!--Twitter-->
<meta name="twitter:card" content="player">
<meta name="twitter:site" content="@reggiegulle">
<meta name="twitter:creator" content="@reggiegulle">
<meta name="twitter:creator:id" content="29137205">
<meta name="twitter:title" content="Visit renegade-karaoke.com, sing, have fun, for FREE!">
<meta name="twitter:description" content="renegade-karaoke.com || Your ultimate destination for FREE and unlimited access to your favorite karaoke songs!">
<meta name="twitter:image" content="http://www.renegade-karaoke.com/images/renkaraoke-Welcom-card.1280x720.jpg">
<meta name="twitter:image:alt" content="A picture showing the webpage of renegade-karaoke.com">
<meta name="twitter:player" content="https://www.youtube.com/embed/NSLGVI8vbSM" />
<meta name="twitter:player:width" content="1280" />
<meta name="twitter:player:height" content="720" />
<!--FB OG-->
<meta property="og:type" content="website"/>
<meta property="og:title" content="FREE Karaoke Anytime Anywhere | Renegade Karaoke!"/>
<meta property="og:site_name" content="Renegade Karaoke"/>
<meta property="og:url" content="http://www.renegade-karaoke.com/"/>
<meta property="og:description" content="The ultimate online karaoke web app with FREE and unlimited access to your favorite songs. Now you can sing-along to karaoke anywhere, anytime, on any device absolutely free!  Bust your pipes, show them You've Got Talent and be your own Singing Idol!"/>
<meta property="og:video:url" content="https://www.youtube.com/embed/NSLGVI8vbSM" />
<meta property="og:video:secure_url" content="https://www.youtube.com/embed/NSLGVI8vbSM" />
<meta property="og:video:type" content="text/html" />
<meta property="og:video:width" content="1280" />
<meta property="og:video:height" content="720" />
<meta property="og:video:url" content="http://www.youtube.com/v/NSLGVI8vbSM?version=3&autohide=1" >
<meta property="og:video:secure_url" content="https://www.youtube.com/v/NSLGVI8vbSM?version=3&autohide=1" />
<meta property="og:video:type" content="application/x-shockwave-flash" />
<meta property="og:video:width" content="1280" />
<meta property="og:video:height" content="720" />
<meta property="og:image" content="http://www.renegade-karaoke.com/images/renkaraoke-Welcom-card.1280x720.jpg"/>
<meta property="og:image:type" content="image/jpeg"/>
<meta property="og:image:width" content="1280"/>
<meta property="og:image:height" content="720"/>
<meta property="fb:app_id" content="412347942245523"/>
<title>FREE Karaoke Anytime Anywhere | Renegade Karaoke!</title>
<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<!--Separate css files to be minified in deployment-->
<link rel="icon" href="favicon.ico" type="image/x-icon" />
<!--bootstrap css files-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<!--datatables-bootstrap integration css files-->
<link href="css/dataTables.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<!--datatables responsive plug-in css-->
<link href="css/responsive.bootstrap.css" rel="stylesheet" type="text/css" media="screen">
<!--bxslider css-->
<link href="css/jquery.bxslider.css" rel="stylesheet" type="text/css" media="screen">
<!--Google Fonts-->
<link href='http://fonts.googleapis.com/css?family=Anton|Roboto' rel='stylesheet' type='text/css'>
<!--Custom css-->
<link href="css/karaoke.main.css" rel="stylesheet" type="text/css" media="screen">
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<!--Bootstrap JS--> 
<script src="js/bootstrap.js" type="text/javascript"></script>
<!--datatables core-->
<script src="js/jquery.dataTables.js" type="text/javascript"></script>
<script src="js/dataTables.bootstrap.js" type="text/javascript"></script>
<script src="js/select.js" type="text/javascript"></script>
<!--datatables extensions-->
<script src="js/dataTables.responsive.js" type="text/javascript"></script>
<script src="js/responsive.bootstrap.js" type="text/javascript"></script>
<!-- bxslider JS -->
<script src="js/jquery.bxslider.js" type="text/javascript"></script>
<!--GSAP library-->
<script src="js/CSSPlugin.js" type="text/javascript"></script>
<script src="js/TweenLite.js" type="text/javascript"></script>
<script src="js/TimelineLite.js" type="text/javascript"></script>
<script src="js/EasePack.js" type="text/javascript"></script>
<?php
    if ($user->isLoggedIn()) {
?>
        <script type="text/javascript">
            var registered = 'green';
        </script>
        <!--custom JS-->
        <script src="js/karaoke_table_registered_user.js" type="text/javascript"></script>
        <!--custom bxslider and youtube JS-->
        <script src="js/karaoke_bx_and_yT_registered_user.js" type="text/javascript"></script>
<?php
    } else if (!$user->isLoggedIn()) {
?>
        <script type="text/javascript">
            var registered = 'black';
        </script>
        <!--custom datatable JS-->
        <script src="js/karaoke_table_non_registered_user.js" type="text/javascript"></script>
        <!--custom bxslider and youtube JS-->
        <script src="js/karaoke_bx_and_yT_non_registered_user.js" type="text/javascript"></script>
<?php
    }
?>
<!--stylejs-->
<script src="js/karaoke.style.js" type="text/javascript"></script>
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
                    
                    <!--Facebook Like and Share buttons-->
                    <li class="fb-like col-xs-6" data-href="http://www.renegade-karaoke.com/" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true" data-width="225px">
                    </li>
                    
                    <!--Twitter button-->
                    <li class="col-xs-6">
                        <a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-size="large">
                            Tweet
                        </a>
                    </li>
                    
                    <script>
                        
                        window.twttr = (function(d, s, id) {
                            var js, 
                                fjs = d.getElementsByTagName(s)[0],
                                t = window.twttr || {};
                            
                            if (d.getElementById(id)) return t;
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "https://platform.twitter.com/widgets.js";
                            fjs.parentNode.insertBefore(js, fjs);

                            t._e = [];
                            t.ready = function(f) {
                                t._e.push(f);
                            };

                            return t;
                        }(document, "script", "twitter-wjs"));
                        
                    </script>
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
                    if(Session::exists('delete')){
                        echo '<p>' . Session::flash('delete') . '</p>';
                    }
                ?>
                    </article>
                </article>
                <?php
                    }
                ?>	
            </section>

            <section class="row">
                <div class="col-xs-12">
                    <section id="karaoke-player-container">
                        <article id="prev-arrow" class="player-nav"></article>
                        <article id="next-arrow" class="player-nav"></article>
                        <article id="yt-player">
                        </article>
                        <article class="karaoke-splash-details-container">
                            <div class="karaoke-splash-details">
                                <h4></h4>
                                <p></p>
                            </div>
                        </article>
                    </section>
                </div>
                
                <section id="titlelist-container">
                    <ul id="karaoketitlelist">
                    </ul>
                </section>

                <article id="info-buttons" class="col-xs-12">
                    <ul>
                        <li id="showinfo">SHOW INFO</li>
                        <li id="hideinfo">HIDE INFO</li>
                    </ul>
                </article>
                
                <div class="col-xs-12">
                    <section id="desclist-container">
                        <ul id="karaokedesclist">
                        </ul>
                    </section>
                </div>

                <section id="karaoke-slider-container" class="col-xs-12">
                    <ul id="karaoke-slider">	
                    </ul>
                </section>   
            </section>
            
            <div class="bxslider-custom-page-turn-container row">
                <button id="prev-slider-page" class="col-xs-4 col-sm-2 bxslider-custom-page-turn gradient">Prev Page</button>
                <button id="next-slider-page" class="col-xs-4 col-xs-offset-8 col-sm-2 col-sm-offset-10 bxslider-custom-page-turn gradient">Next Page</button>
            </div>

            <?php
                if($user->isLoggedIn()){
            ?>
                    <article class="addnew">
                        <a href="add_video.php">Add New Video</a>
                    </article>
            <?php
                }
            ?>

            <section id="videos_datatable_container">

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