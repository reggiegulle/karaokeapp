<?php

class Video{
	private $_db,
			$_data;
	
	public function __construct(){
		$this->_db = DB::getInstance();
	}
	
/* 	public function update($fields = [], $id = null){
	
		if(!$id && $this->isLoggedIn()){
			$id = $this->data()->id;
		}
	
		if(!$this->_db->update('users', $id, $fields)){
			throw new Exception('There was a problem updating.');
		}
	} */
	
	public function create($fields = []){
		if(!$this->_db->insert('videos', $fields)){
			throw new Exception('There was a problem creating a video entry.');
		}
	}
	
/* 	public function find($user = null){
		if($user){
			$field = (is_numeric($user)) ? 'id' : 'username';
			$data = $this->_db->get('users', [$field, '=', $user]);
			
			if($data->count()){
				$this->_data = $data->first();
				return true;
			}
		}
		return false;
	}

	//public function exists
	public function exists(){
		return(!empty($this->_data)) ? true : false;
	} */

	public function data(){
		return $this->_data;
	}
	

}

?>