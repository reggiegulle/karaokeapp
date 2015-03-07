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

$table = 'videos';

$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier.
$columns = [
	[ 'db'	=>	'id',			'dt'	=>	0 ],
	[ 'db'	=>	'song_title',	'dt'	=>	1 ],
	[ 'db'	=>	'composer',		'dt'	=>	2 ],
	[ 'db'	=>	'performed_by',	'dt' 	=>	3 ],
	[ 'db'	=>	'video_id',		'dt'	=>	4 ],
	[ 'db'	=>	'source_album', 'dt'	=>	5 ],
	[ 'db'	=>	'year_of_release',	'dt'	=>	6 ],
	[ 'db'	=>	'genre',		'dt'	=>	7 ],
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

$sql_details = [
	'user' => '',
	'pass' => '',
	'db'   => '',
	'host' => ''
];


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

require( '../ajax/ssp.class.php' );

echo json_encode(
	SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);
?>