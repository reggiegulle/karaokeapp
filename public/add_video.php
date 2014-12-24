<?php
	require_once '../includes/init.php';
	
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
				'numeric'	=> true,
				'yrstrlen' => 4
			],
			'genre'	=> [
				'required'	=> true
			],
			'country_of_origin'	=> [
				'required'	=> true,
				'min'	=> 3
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
			$video = new Video();
			
			$running_time = '00:';
			$running_time .= (Input::get('running_time_min'));
			$running_time .= ':';
			$running_time .= (Input::get('running_time_sec'));
			
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
					'lyrics'			=> (Input::get('lyrics'))
					
				]);
				
				Session::flash('add_video', 'You have added a new video entry!');
			} catch (Exception $e){
				die($e->getMessage());
			}
		} else {
			//output errors
			//print_r($validation->errors());
			foreach($validation->errors() as $error){
				echo $error, '<br />';
			}
		}
	}
?>

<article>
<?php
if(Session::exists('add_video')){
	echo '<p>' . Session::flash('add_video') . '</p>';
}
?>
</article>

<h1>Add New Video</h1>
<form id="addnewvideo" action="" method="POST">
	<label for="song_title"><p>Song Title:</p></label>
	<input type="text" id="song_title" name="song_title" form="addnewvideo" value="" />
	<label for="composer"><p>Song Composer:</p></label>
	<input type="text" id="composer" name="composer" form="addnewvideo" value="" />
	<label for="performed_by"><p>Song Performer:</p></label>
	<input type="text" id="performed_by" name="performed_by" form="addnewvideo" value="" />
	<label for="video_id"><p>YouTube Video ID:</p></label>
	<input type="text" id="video_id" name="video_id" form="addnewvideo" value="" />	
	<label for="source_album"><p>Source Album:</p></label>
	<input type="text" id="source_album" name="source_album" form="addnewvideo" value="" />
	<label for="year_of_release"><p>Year of Release:</p></label>
	<input type="text" id="year_of_release" name="year_of_release" form="addnewvideo" value="" />
	<label for="genre"><p>Genre:</p></label>
	<input type="text" id="genre" name="genre" form="addnewvideo" value="" />
	<label for="country_of_origin"><p>Country of Origin:</p></label>
	<input type="text" id="country_of_origin" name="country_of_origin" form="addnewvideo" value="" />
	<label for="running_time"><p>Running Time:</p></label>
	<input type="text" id="running_time_min" name="running_time_min" form="addnewvideo" value="" /> min :
	<input type="text" id="running_time_sec" name="running_time_sec" form="addnewvideo" value="" /> sec
	<label for="lyrics"><p>Song Lyrics:</p></label>
	<textarea id="lyrics" name="lyrics"></textarea>
	<br />
	<input type="submit" value="Create Entry" />
	<a href="../index.php">Cancel</a>
</form>