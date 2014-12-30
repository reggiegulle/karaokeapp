<?php

	require_once 'includes/init.php';
	
	$user = new User();
	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
	
		if (!Input::exists('get') || $_GET['video_id'] === '') {
			Redirect::to('../index.php');
		}
			
		if (Input::exists('get')){
			
			$video = new Video();
			$video_id = $video->safe_string(Input::get('video_id'));
			$video->find($video_id);
		}
		
		if (!$video->exists()){
			Redirect::to('../index.php');
		} else {
			//echo "The video is in the database.";
			//var_dump($video->data());
			//print_r($video->data());
		
			if(Input::exists('post')){
		
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
						'min'		=> 11
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
					$lyrics_text = nl2br(Input::get('lyrics'));
					
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
						
						Session::flash('update_video', 'Video details for song "' . $video->data()->song_title . '" updated.');
					} catch(Exception $e){
						die($e->getMessage());
					}
				
				} else {
					//echo errors
					foreach($validation->errors() as $error){
							echo $error . '<br />';
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

<title>Renegade Karaoke Update Video</title>

<!--Set the window's initial width -->
<meta name="viewport" content="width=device-width, initial-scale=1"/>

<!--Google Fonts-->
<link href='http://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>
<!--Separate css files to be minified in deployment-->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="screen" />
<link href="css/bootstrap-theme.css" rel="stylesheet" type="text/css" media="screen" />
<!--Custom css-->
<link href="css/karaoke.main.css" rel="stylesheet" type="text/css" media="screen">
</head>
<body>

<section id="header">		
	<h1><a href="index.php">Renegade Karaoke</a></h1>
</section>
		
	<div id="wrapper">
		
		<article id="user_panel_normal">
			<article>
				<?php
				if(Session::exists('update_video')){
					echo '<p>' . Session::flash('update_video') . '</p>';
				}
				?>
			</article>
			<h1>Edit Video Details</h1>
			<form id="addnewvideo" action="" method="POST">
				<div class="field">
					<label for="song_title"><p>Song Title:</p></label>
					<input type="text" id="song_title" name="song_title" form="addnewvideo" value="<?php echo escape($video->data()->song_title); ?>" />
				</div>
				<div class="field">
					<label for="composer"><p>Song Composer:</p></label>
					<input type="text" id="composer" name="composer" form="addnewvideo" value="<?php echo escape($video->data()->composer); ?>" />
				</div>
				<div class="field">
					<label for="performed_by"><p>Song Performer:</p></label>
					<input type="text" id="performed_by" name="performed_by" form="addnewvideo" value="<?php echo escape($video->data()->performed_by); ?>" />
				</div>
				<div class="field">
					<label for="video_id"><p>YouTube Video ID:</p></label>
					<input type="text" id="video_id" name="video_id" form="addnewvideo" value="<?php echo escape($video->data()->video_id); ?>" />	
				</div>
				<div class="field">
					<label for="source_album"><p>Source Album:</p></label>
					<input type="text" id="source_album" name="source_album" form="addnewvideo" value="<?php echo escape($video->data()->source_album); ?>" />
				</div>
				<div class="field">
					<label for="year_of_release"><p>Year of Release:</p></label>
					<input type="text" id="year_of_release" name="year_of_release" form="addnewvideo" value="<?php echo escape($video->data()->year_of_release); ?>" />
				</div>
				<div class="field">
					<label for="genre"><p>Genre:</p></label>
					<input type="text" id="genre" name="genre" form="addnewvideo" value="<?php echo escape($video->data()->genre); ?>" />
				</div>
				<div class="field">
					<label for="country_of_origin"><p>Country of Origin:</p></label>
					<input type="text" id="country_of_origin" name="country_of_origin" form="addnewvideo" value="<?php echo escape($video->data()->country_of_origin); ?>" />
				</div>
				<div class="field">
					<label for="running_time"><p>Running Time:</p></label>
					<input type="text" id="running_time_min" name="running_time_min" form="addnewvideo" value="<?php echo escape(substr(($video->data()->running_time), 3, 2)); ?>" /> min :
					<input type="text" id="running_time_sec" name="running_time_sec" form="addnewvideo" value="<?php echo escape(substr(($video->data()->running_time), 6, 2)); ?>" /> sec
				</div>
				<div class="field">
					<label for="lyrics"><p>Song Lyrics:</p></label>
					<textarea id="lyrics" rows="10" cols="70" name="lyrics"><?php echo escape($video->data()->lyrics); ?></textarea>
					<br />
				</div>
				<input type="submit" value="Edit Entry" />
				<input id="button" onclick="resetform()" type="button" value="Cancel">
			</form>
		</article>
	</div>
	
	<section>
		<article id="footer">
			<ul id="footer-ul">
				<li>Powered by <a href="http://www.youtube.com" title="YouTube"><img src="images/Youtube_icon45.png" width="45px" height="45px" alt="youtube_icon" /></a></li>
				<li><p>Design and UI by</p><h3>Reggie Gulle</h3></li>
				<li><p>All Rights Reserved 2014</p></li>
			</ul>
		</article>
	</section>
	<script type="text/javascript">
		function resetform() {
			document.getElementById("addnewvideo").reset();
		}
	</script>
</body>
</html>