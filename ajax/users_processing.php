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

$table = 'users';

$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. 
$columns = [
	[ 'db'	=>	'id',			'dt'	=>	0 ],
	[ 'db'	=>	'username',	'dt'	=>	1 ],
	[ 'db'	=>	'name',		'dt'	=>	2 ],
	[ 	'db'	=>	'joined',	
		'dt' 	=>	3,
		'formatter' => function( $d, $row ) {
			return date( 'jS M y', strtotime($d));
		}	
	],
	[ 'db'	=>	'group',		'dt'	=>	4 ]
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