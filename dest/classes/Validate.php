<?php

class Validate{
	private		$_passed	= false,
				$_errors	= [],
				$_db		= null;
	
	public function __construct(){
		$this->_db = DB::getInstance();
	}
	
	public function check($source, $items = []){
		foreach($items as $item => $rules){
			foreach($rules as $rule => $rule_value){
				//echo the format
				//echo "{$item} {$rule} must be {$rule_value}<br />";
				
				$value = trim($source[$item]);
				//echo $value;
				
				$item = escape($item);
				
				if($rule === 'required' && empty($value)){
					$this->addError($this->clean_item_output($item) . " cannot be blank.");
					Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' cannot be blank.');
				} else if(!empty($value)){
					switch($rule){
						case 'min':
							if(strlen($value) < $rule_value){
								$this->addError($this->clean_item_output($item) . " must be a minimum of {$rule_value} characters.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' must be a minimum of ' . $rule_value . ' characters');
							}
						break;
						case 'max':
							if(strlen($value) > $rule_value){
								$this->addError($this->clean_item_output($item) . " must be a maximum of {$rule_value} characters.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' must be a maximum of ' . $rule_value . ' characters');
							}
						break;
						case 'matches':
							if($value != $source[$rule_value]){
								$this->addError("{$rule_value} must match " . $this->clean_item_output($item));
								Session::flash('' . $item . '', '' . $rule_value . ' must match ' . $this->clean_item_output($item) . '.');
							}
						break;
						case 'unique':
							$check = $this->_db->get($rule_value, [$item, '=', $value]);
							if($check->count()) {
								$this->addError($this->clean_item_output($item) . " already exists.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' already exists.');
							}
						break;						
						case 'editnotduplicate':
							$check = $this->_db->check_update_not_duplicate($rule_value,[$item, $value, "id", $_GET['id']]);
							if($check->count()){
								$this->addError($this->clean_item_output($item) . " is already in use. Please put a different value.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' is already in use. Please put a different value.');
							}
						break;					
						case 'strictlydigits':
							if(!is_numeric((int)$value)){
								$this->addError($this->clean_item_output($item) . " must be a number.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' must be a number.');
							}
						break;
						case 'yrstrlen':
							if(strlen($value) != $rule_value){
								$this->addError($this->clean_item_output($item) . " must have four(4) digits.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' must have four(4) digits.');
							}
						break;
						case 'tmstrlen':
							if(strlen($value) != $rule_value){
								$this->addError($this->clean_item_output($item) . " must have two(2) digits.  Needs a leading '0' if less than '10'.");
								Session::flash('' . $item . '', '' . $this->clean_item_output($item) . ' must have two(2) digits.  Needs a leading \'0\' if less than \'10\'.');
							}
						break;
					}
				}
			}
		}
		
		if(empty($this->_errors)){
			$this->_passed = true;
		}
		
		return $this;
	}
	
	private function clean_item_output($item){
		if (preg_match('/_/', $item)) {
			$item_raw = explode('_', $item);
			$output = '';
			$output .= strtoupper(implode(' ', $item_raw));
			return $output;
		} 
		return strtoupper($item);
	}
	
	private function addError($error){
		$this->_errors[] = $error;
	}
	
	public function errors(){
		return $this->_errors;
	}
	
	public function passed(){
		return $this->_passed;
	}
}

?>