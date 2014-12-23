<?php

class DB{
	//these private properties cannot be accessed until
	//an object with these properties are instantiated
	//We will use "Singleton" class framework
	private static $_instance = null;
	private $_pdo, //when PDO is instantiated, this is its representation, so it can be stored elsewhere
			$_query, //query will stand for the last query executed 
			$_error = false, //error will return TRUE or FALSE whether there is an error or not, but default value is FALSE
			$_results, //will store the values of a "result set" 
			$_count = 0; //will represent the count of results; default value is "0"
	//A constructor function to connect to the database
	//being a private function, it's scope is only inside this DB class
	//and cannot be called again (because of the getInstance function below)
	private function __construct() {
		try {
			$this->_pdo = new PDO('mysql:host=' . Config::get('mysql/host') . ';dbname=' . Config::get('mysql/db'), Config::get('mysql/username'), Config::get('mysql/password'));//all values will be taken from the 'init.php' array values
			//the syntax of the new PDO is ("mysql:host=hostname;databasename=databasename",username","password","options")
			//echo "Connected";
		} catch(PDOException $e) {
			die($e->getMessage()); //will basically just echo an error message based on the $e value
		}
	}
	
	public static function getInstance() {
		//if there is no value for $_instance(which is the default behaviour because $_instance is equal to "null" above)
		//it will run the function __construct above, 
		//which creates a new connection to the database
		if(!isset(self::$_instance)) {
			self::$_instance = new DB();
		}
		//if $_instance is set,
		//it will just return the present $_instance
		return self::$_instance;
	}
	
	public function query($sql, $params = array()) {
		$this->_error = false; //error is from the DB class above
		//basically all the words prefixed by a simple underscore here are taken from the DB class variables
		//if query is prepared successfully
		if($this->_query = $this->_pdo->prepare($sql)) {
			//echo 'Success';
			$x = 1;
			if(count($params)){
			//if the $params argument has items in it
				foreach($params as $param) {
					$this->_query->bindValue($x, $param); //bindValue is a pre-determined method where bindValue(pos, parameter value);
					$x++;
				}
			}
			if($this->_query->execute()){
				//if the query has been executed successfully
				//echo 'Yahoo';
				$this->_results = $this->_query->fetchAll(PDO::FETCH_OBJ);
				$this->_count = $this->_query->rowCount();
			} else {
				$this->_error = true;
			}
		}
		
		return $this;
	}
	
	public function action($action, $table, $where=[]){
		if(count($where) === 3){
			$operators = ["=", ">", "<", ">=", "<="];
			
			$field 		= $where[0];
			$operator 	= $where[1];
			$value 		= $where[2];
			
			if(in_array($operator, $operators)){
				/* template for the $sql variable below
				$sql = "SELECT * FROM users WHERE username = 'Alex'"; */
				$sql = "{$action} FROM {$table} WHERE {$field} {$operator} ?";
				
				if(!$this->query($sql, array($value))->error()){
					return $this;
				}
			}
		}
		return false;
	}
	
	public function get($table,$where){
		return $this->action('SELECT *', $table, $where);
	}
	
	public function delete($table, $where){
		return $this->action('DELETE ', $table, $where);
	}
	
	public function insert($table, $fields = []){
		if(count($fields)){
			$keys = array_keys($fields);
			$values = '';
			$x = 1;
			
			foreach($fields as $field){
				$values .= '?';
				if($x < count($fields)){
					$values .= ', ';
				}
				$x++;
			}
		
			$sql = "INSERT INTO {$table} (`" . implode ('` , `', $keys) . "`) VALUES ({$values})";
			
			if(!$this->query($sql, $fields)->error()){
				return true;
			}
		}
		
		return false;
	}
	
	public function update($table, $id, $fields){
		$set = '';
		$x = 1;
		
		foreach($fields as $name => $value) {
			$set .= "{$name} = ?";
			if($x < count($fields)){
				$set .= ', ';
			}
			$x++;
		}
		
		$sql = "UPDATE {$table} SET {$set} WHERE id = {$id}";
		
		if(!$this->query($sql, $fields)->error()){
			return true;
		}
		
		return false;
	}
	
	public function results(){
		return $this->_results;
	}
	
	public function first(){
		return $this->results()[0];
	}
	
	public function error() {
		return $this->_error;
	}
	
	public function count(){
		return $this->_count;
	}

}

?>