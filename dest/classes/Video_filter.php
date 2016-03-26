<?php

class Video_filter{
	private $_db,
			$_data;
			
	public function __construct(){
		$this->_db = DB::getInstance();
	}
	
	public function generate_vid_filter_opts($filter_name, $table){
	
		$filter_query_string = 'SELECT `' . $filter_name . '`, COUNT(*) AS `' . $filter_name . '_by_frequency` FROM `' . $table . '` GROUP BY `' . $filter_name . '`';
		
		if(!$filter_query = $this->_db->query($filter_query_string)->error()){
			$filter_query_results = $this->_data = $this->_db->results();
			return $this;
		}
		
		return false;
		
	}
	
	public function data(){
		return $this->_data;
	}
	

}





?>