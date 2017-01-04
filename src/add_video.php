<?php
	require_once 'includes/init.php';
	
	$user = new User();
	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
	
        $data = $user->data();

        if(Input::exists()){
            
            $validate = new Validate();
            $validation = $validate->check($_POST, [
                'song_title'	=> [
                    'required'	=> true
                ],
                'composer'	=> [
                    'required'	=> true
                ],
                'performed_by' => [
                    'required'	=> true
                ],
                'video_id' => [
                    'required'	=> true,
                    'min'		=> 11,
                    'unique'	=> 'videos'
                ],
                'source_album' => [
                    'required'	=> true
                ],
                'year_of_release' => [
                    'required'	=> true,
                    'strictlydigits'	=> true,
                    'yrstrlen' => 4
                ],
                'genre'	=> [
                    'required'	=> true
                ],
                'country_of_origin'	=> [
                    'required'	=> true,
                    'min'	=> 2
                ],
                'running_time_min'	=> [
                    'required'	=> true,
                    'strictlydigits'	=> true,
                    'tmstrlen'	=> 2
                ],
                'running_time_sec'	=> [
                    'required'	=> true,
                    'strictlydigits'	=> true,
                    'tmstrlen'	=> 2
                ],
                'lyrics'	=> [
                    'required'	=> true
                ]
            ]);

            if($validation->passed()){
                
                $video = new Video();

                $running_time = '00:';
                $running_time .= (Input::get('running_time_min'));
                $running_time .= ':';
                $running_time .= (Input::get('running_time_sec'));
                $lyrics_text = '<br/ >';
                $lyrics_text .= nl2br(Input::get('lyrics'));

                try{

                    $video->create([
                        'song_title'		=> (Input::get('song_title')),
                        'composer'			=> (Input::get('composer')),
                        'performed_by'		=> (Input::get('performed_by')),
                        'video_id'			=> (Input::get('video_id')),
                        'source_album'		=> (Input::get('source_album')),
                        'year_of_release'	=> (Input::get('year_of_release')),
                        'genre'				=> (Input::get('genre')),
                        'country_of_origin'	=> (Input::get('country_of_origin')),
                        'running_time'		=> $running_time,
                        'lyrics'			=> $lyrics_text,
                        'added_by'			=> (Input::get('username'))

                    ]);

                    Session::flash('add_video', 'You have added a new video entry!');
                } catch (Exception $e){
                    die($e->getMessage());
                }
            }
		}
	}
?>

<?php
	
	$pageTitle = "Add New Video";

	include_once "includes/user_htmlHead.php";
?>
<body>

<?php
	include_once "includes/user_section_header.php";
?>
    <div class="container">
        
        <div class="row">
        
            <section id="user_panel_normal" class="user_panel col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">

                <article class="col-xs-12 feedback-notif">
                    <?php
                    if(Session::exists('add_video')){
                        echo '<p>' . Session::flash('add_video') . '</p>';
                    } else if(!Session::exists('add_video')){
                        echo '<p>No Video Added Yet</p>';
                    }
                    ?>
                </article>

                <h1 class="col-xs-12">Add New Video</h1>
                <form id="addnewvideo" action="" method="POST">
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('song_title')){
                                echo '<p>' . Session::flash('song_title') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="song_title" class="col-xs-12"><p>Song Title:</p></label>
                        <input type="text" id="song_title" class="col-xs-8 col-sm-5" name="song_title" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('song_title')); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('composer')){
                                echo '<p>' . Session::flash('composer') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="composer" class="col-xs-12"><p>Composer:</p></label>
                        <input type="text" id="composer" class="col-xs-8 col-sm-5" name="composer" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('composer')); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('performed_by')){
                                echo '<p>' . Session::flash('performed_by') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="performed_by" class="col-xs-12"><p>Performed By:</p></label>
                        <input type="text" id="performed_by" class="col-xs-8 col-sm-5" name="performed_by" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('performed_by')); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('video_id')){
                                echo '<p>' . Session::flash('video_id') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="video_id" class="col-xs-12"><p>Video ID:</p></label>
                        <input type="text" id="video_id" class="col-xs-8 col-sm-5" name="video_id" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('video_id')); }  ?>" />	
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('source_album')){
                                echo '<p>' . Session::flash('source_album') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="source_album" class="col-xs-12"><p>Source Album:</p></label>
                        <input type="text" id="source_album" class="col-xs-8 col-sm-5" name="source_album" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('source_album')); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('year_of_release')){
                                echo '<p>' . Session::flash('year_of_release') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="year_of_release" class="col-xs-12"><p>Year of Release:</p></label>
                        <input type="text" id="year_of_release" class="col-xs-3 col-sm-2" name="year_of_release" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo Input::get('year_of_release'); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('genre')){
                                echo '<p>' . Session::flash('genre') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="genre" class="col-xs-12"><p>Genre:</p></label>
                        <input type="text" id="genre" class="col-xs-8 col-sm-5" name="genre" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('genre')); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('country_of_origin')){
                                echo '<p>' . Session::flash('country_of_origin') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="country_of_origin" class="col-xs-12"><p>Country of Origin:</p></label>
                        <input type="text" id="country_of_origin" class="col-xs-8 col-sm-5" name="country_of_origin" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('country_of_origin')); }  ?>" />
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('running_time_min')){
                                echo '<p>' . Session::flash('running_time_min') . '</p>';
                            }
                            ?>
                        </article>
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('running_time_sec')){
                                echo '<p>' . Session::flash('running_time_sec') . '</p>';
                            }
                            ?>
                        </article>
                        <div class="col-xs-12">
                            <label for="running_time"><p>Running Time:</p></label>
                            <br />
                            <input type="text" id="running_time_min" name="running_time_min" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo Input::get('running_time_min'); }  ?>" /> <span class="time-input">min</span>
                            <input type="text" id="running_time_sec" name="running_time_sec" form="addnewvideo" value="<?php if(!Session::exists('add_video')){ echo Input::get('running_time_sec'); }  ?>" /> <span class="time-input">sec</span>
                        </div>  
                    </div>
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('lyrics')){
                                echo '<p>' . Session::flash('lyrics') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="lyrics" class="col-xs-12"><p>Song Lyrics:</p></label>
                        <textarea id="lyrics" name="lyrics" class="col-xs-12"><?php if(!Session::exists('add_video')){ echo html_entity_decode(Input::get('lyrics')); } ?></textarea>
                    </div>
                    <br />
                    <input type="hidden" name="username" value="<?php echo escape($data->username); ?>" />
                    <div class="col-xs-12">
                        <input type="submit" value="Create Entry"/>
                        <a class="cancel-button" href="index.php">Cancel</a>
                    </div>
                </form>

            </section>
        
        </div>
            
    </div>
<?php
	include_once "includes/user_footer.php";
?>