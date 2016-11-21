<?php

	require_once 'includes/init.php';
	
	$user = new User();
	
	if (!$user->isLoggedIn()){
		Redirect::to('index.php');
	} else {
		if (!Input::exists('get')) {
			Redirect::to('../index.php');
		}
		
		foreach($_GET as $key => $value){
			if ($value === ""){
				Redirect::to('../index.php');
			}
		}
			
		if (Input::exists('get')){
			$video = new Video();
			$video_id = $video->safe_string(Input::get('video_id'));
			$video->find($video_id);
			$song_title = $video->safe_string(Input::get('song_title'));
		}
		
		
		
		if (!$video->exists()){
			Redirect::to('../index.php');
		} else {
			//echo "Hello World!";
			try{
				$video->delete([
					'id', '=' , Input::get('video_id')
				]);
				
				Session::flash('delete', 'Video for song "' . $song_title . '" has been deleted from the database.');
				Redirect::to('index.php');
			} catch (Exception $e){
				die($e->getMessage());
			}
			//print_r($video->data());
		}
	}
?>
