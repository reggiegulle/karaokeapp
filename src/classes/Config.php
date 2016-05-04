<?php
class Config {
	public static function get($path = null){
		if($path){
			$config = $GLOBALS['config'];
			$path = explode('/', $path);//split the data according to the presence of the forward slash and return an array
			/* to demonstrate the initial array result
			uncomment this command
			print_r($path); */
			foreach($path as $bit){
				/* to demonstrate the echo below
				uncomment this command
				echo $bit,' '; */
				if(isset($config[$bit])){
					//if value of $config is set,
					//$config will become $config[$bit]
					$config = $config[$bit];
				}
			}
			return $config; // return the value of the newly set $config(which is now equal to $config[$bit]
		}
		return false;//this is an ELSE condition, if the first condition {if($path)} isn't met, the value is FALSE
	}
}
?>