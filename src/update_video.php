<?php

	require_once 'includes/init.php';
	
	$user = new User();
	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
	
		if (!Input::exists('get') || $_GET['id'] === '') {
			Redirect::to('../index.php');
		}
			
		if (Input::exists('get')){
			
			$video = new Video();
			$video_index = $video->safe_string(Input::get('id'));
			$video->find($video_index);
		
			if(Input::exists('post')){
                
                foreach($_POST as $key => $value){
                    ${$key} = $value;
                }
		
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
						'editnotduplicate'	=> 'videos'
					],
					'source_album' => [
						'required'	=> true
					],
					'year_of_release' => [
						'required'	=> true,
						'numeric'	=> true,
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
						'numeric'	=> true,
						'tmstrlen'	=> 2
					],
					'running_time_sec'	=> [
						'required'	=> true,
						'numeric'	=> true,
						'tmstrlen'	=> 2
					],
					'lyrics'	=> [
						'required'	=> true
					]
				]);
			
				if($validation->passed()){
					//update
					
					$running_time = '00:';
					$running_time .= (Input::get('running_time_min'));
					$running_time .= ':';
					$running_time .= (Input::get('running_time_sec'));
					$lyrics_text = '<br/ >';
				    $lyrics_text .= nl2br(Input::get('lyrics'));
					
					try{
						$video->update([
							'song_title'		=> (Input::get('song_title')),
							'composer'			=> (Input::get('composer')),
							'performed_by'		=> (Input::get('performed_by')),
							'video_id'			=> (Input::get('video_id')),
							'source_album'		=> (Input::get('source_album')),
							'year_of_release'	=> (Input::get('year_of_release')),
							'genre'				=> (Input::get('genre')),
							'country_of_origin'	=> (Input::get('country_of_origin')),
							'running_time'		=> $running_time,
							'lyrics'			=> $lyrics_text
						], $video->data()->id);
						
						Session::flash('update_video', 'Video details for song "' . $song_title . '" updated.');
					} catch(Exception $e){
						die($e->getMessage());
					}
					
					
				
				} /*else {
					//echo errors
					foreach($validation->errors() as $error){
						echo '<p>' . $error . '</p><br />';
					}
				}*/
			}
		}
	}
?>

<?php
	
	$pageTitle = "Edit Video";

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
                    if(Session::exists('update_video')){
                        echo '<p>' . Session::flash('update_video') . '</p>';
                    }
                    ?>
                </article>
                
                <h1 class="col-xs-12">Edit Video Details</h1>
                <form id="updatevideo" action="" method="POST">
                    <div class="field">
                        <article class="col-xs-12 feedback-notif">
                            <?php
                            if(Session::exists('song_title')){
                                echo '<p>' . Session::flash('song_title') . '</p>';
                            }
                            ?>
                        </article>
                        <label for="song_title" class="col-xs-12"><p>Song Title:</p></label>
                        <input type="text" id="song_title" class="col-xs-8 col-sm-5" name="song_title" form="updatevideo" value="<?php echo '' . isset($song_title) ? html_entity_decode($song_title) : escape($video->data()->song_title) . ''; ?>" />
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
                        <input type="text" id="composer" class="col-xs-8 col-sm-5" name="composer" form="updatevideo" value="<?php echo '' . isset($composer) ? html_entity_decode($composer) : escape($video->data()->composer) . ''; ?>" />
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
                        <input type="text" id="performed_by" class="col-xs-8 col-sm-5" name="performed_by" form="updatevideo" value="<?php echo '' . isset($performed_by) ? html_entity_decode($performed_by) : escape($video->data()->performed_by) . ''; ?>" />
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
                        <input type="text" id="video_id" class="col-xs-8 col-sm-5" name="video_id" form="updatevideo" value="<?php echo '' . isset($video_id) ? html_entity_decode($video_id) : escape($video->data()->video_id) . ''; ?>" />	
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
                        <input type="text" id="source_album" class="col-xs-8 col-sm-5" name="source_album" form="updatevideo" value="<?php echo '' . isset($source_album) ? html_entity_decode($source_album) : escape($video->data()->source_album) . ''; ?>" />
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
                        <input type="text" id="year_of_release" class="col-xs-3 col-sm-2" name="year_of_release" form="updatevideo" value="<?php echo '' . isset($year_of_release) ? html_entity_decode($year_of_release) : escape($video->data()->year_of_release) . ''; ?>" />
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
                        <input type="text" id="genre" class="col-xs-8 col-sm-5" name="genre" form="updatevideo" value="<?php echo '' . isset($genre) ? html_entity_decode($genre) : escape($video->data()->genre) . ''; ?>" />
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
                        <input type="text" id="country_of_origin" class="col-xs-8 col-sm-5" name="country_of_origin" form="updatevideo" value="<?php echo '' . isset($country_of_origin) ? html_entity_decode($country_of_origin) : escape($video->data()->country_of_origin) . ''; ?>" />
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
                            <input type="text" id="running_time_min" name="running_time_min" form="updatevideo" value="<?php echo '' . isset($running_time_min) ? html_entity_decode($running_time_min) : escape(substr(($video->data()->running_time), 3, 2)); ?>" /> <span class="time-input">min</span>
                            <input type="text" id="running_time_sec" name="running_time_sec" form="updatevideo" value="<?php echo '' . isset($running_time_sec) ? html_entity_decode($running_time_sec) : escape(substr(($video->data()->running_time), 6, 2)); ?>" /> <span class="time-input">sec</span>
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
                        <textarea id="lyrics" name="lyrics" class="col-xs-12"><?php echo '' . isset($lyrics)? escape(strip_tags($lyrics)) : escape(strip_tags($video->data()->lyrics)); ?></textarea>
                    </div>
                    <div class="col-xs-12">
                        <input type="submit" value="Edit Entry" />
                        <a a class="cancel-button" href="index.php">Cancel</a>
                    </div>
                </form>
		  </section>
        
        </div>
        
    </div>
	
<?php
	include_once "includes/user_footer.php";
?>