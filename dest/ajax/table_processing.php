<?php

/*
 *
 * See http://datatables.net/usage/server-side for full details on the server-
 * side processing requirements of DataTables.
 *
 * @license MIT - http://datatables.net/license_mit
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */

// DB table to use
$table = 'videos';

// Table's primary key
$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
$columns = [
	[ 'db'	=>	'id',			'dt'	=>	1 ],
	[ 'db'	=>	'song_title',	'dt'	=>	0 ],
	[ 'db'	=>	'composer',		'dt'	=>	4 ],
	[ 'db'	=>	'performed_by',	'dt' 	=>	2 ],
	[ 'db'	=>	'video_id',		'dt'	=>	3 ],
	[ 'db'	=>	'source_album', 'dt'	=>	6 ],
	[ 'db'	=>	'year_of_release',	'dt'	=>	7 ],
	[ 'db'	=>	'genre',		'dt'	=>	5 ],
	[ 'db'	=>	'country_of_origin',	'dt'	=>	8 ],
	[ 
		'db'	=>	'running_time',	
		'dt'	=>	9, 
		'formatter'	=>	function( $d, $row ) {
			$output = '';
			$runtime = date_parse_from_format('H:i:s' , $d);
			$output .= $runtime['minute'] . "m " . $runtime['second'] . "s";
			return $output;
		}
	],
	[ 'db'	=>	'lyrics',		'dt'	=>	10 ],
	[ 'db'	=>	'added_by',		'dt'	=>	11 ]
];

// SQL server connection information
$sql_details = [
	
];

//utility null variable
$nullValue = null;

/* empty container for string filter
to be populated later */
$string_filter = '';

/* empty container for string filter year_of_release clause
to be populated later */
$string_filter_yr_rls = '';

/*the two possible $_GET keys for filtering
grouped into an array
except for the 'year_of_release' column
because values are numerical and not strings*/
$possible_filter_keys = array('genre', 'country_of_origin');

/* instantiate an empty array
to be populated by $_GET['genre'] and $_GET['country_of_origin'] items */
$filter_array_instantiated = array();

/* iterate through the $_GET items with keys
equal to the possible filter array keys */
foreach($possible_filter_keys as $possible_filter_key){
	if(!isset($_GET[$possible_filter_key])){
		$string_filter = '';
	} else if(isset($_GET[$possible_filter_key]) && $_GET[$possible_filter_key] != 'reset'){
			//populate the filter_array_instantiated
			$filter_array_item = $_GET[$possible_filter_key];
			$filter_array_instantiated[$possible_filter_key] = $filter_array_item;
	}
}

if(!empty($filter_array_instantiated)){
/* 	if the filter_array_instantiated
	has only 1 item, then the query will only
	have one clause, i.e. 'genre = "xxxx"' */
	if(count($filter_array_instantiated) < 2){
		foreach($filter_array_instantiated as $key => $val){
			$string_filter .= '' . $key . ' = "' . $val . '"';
		}
	}
	
/* 	if the filter_array_instantiated
	has 2 items, then the query
	will have multiple clauses */
	if(count($filter_array_instantiated) > 1){
	/* 	instantiate a new array
		as a container for each clause */
		$string_filter_clauses_array = array();
		
		//iterate through the populated $filter_array_instantiated
		foreach($filter_array_instantiated as $key => $val){
		/* 	instantiate an empty string
			to contain an individual assembled query string */
			$string_filter_clauses_array_item = '';
		/* 	assemble the individual query string */	
			$string_filter_clauses_array_item .= '' . $key . ' = "' . $val . '"';
		/* 	push the individual query string into the string_filter_clauses_array */	
			$string_filter_clauses_array[] = $string_filter_clauses_array_item;
		}
		
		if(count($string_filter_clauses_array) > 1){
		/* 	assemble the query string
			using the $string_filter_clauses_array constituents 
			to form 'genre = "xxxx" AND country_of_origin = "yyyyy"'*/	
			$string_filter_clauses = implode(' AND ', $string_filter_clauses_array);
			$string_filter = $string_filter_clauses;
		}
	}
} else {
	$string_filter = '';
}

/*	if the data submitted to the server has $_GET['year_of_release']
	then the following if statement must be evaluated */
if(isset($_GET['year_of_release']) && $_GET['year_of_release'] != 'reset'){
/*	the query clause to be assembled follows the format below:
	' year_of_release BEWEEN $_GET['year_of_release'] AND ($_GET['year_of_release'] + 9)'*/
	$string_filter_yr_component = intval($_GET['year_of_release']);
	$string_filter_yr_rls .= 'year_of_release BETWEEN ' . $string_filter_yr_component . ' AND ';
	$string_filter_yr_rls .= '(' . $string_filter_yr_component . ' + 9)';
	if($string_filter != ''){
		$string_filter .= ' AND ' . $string_filter_yr_rls;
	} else if ($string_filter == ''){
		$string_filter .= $string_filter_yr_rls;
	}
} else if(!isset($_GET['year_of_release']) || (isset($_GET['year_of_release']) && $_GET['year_of_release'] == 'reset')){
	$string_filter_yr_rls = '';
} 

require( '../ajax/ssp.class.php' );

$results = SSP::complex( $_GET, $sql_details, $table, $primaryKey, $columns, $nullValue, $string_filter);

if ($_GET['order'][0]['column'] === '1') {
    shuffle( $results['data'] );
}

echo json_encode( $results );

?>