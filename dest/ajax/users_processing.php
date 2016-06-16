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
$table = 'users';

// Table's primary key
$primaryKey = 'id';

// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case simple
// indexes
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

// SQL server connection information
$sql_details = [
	'user' => 'xxxxxxxxx',
	'pass' => 'xxxxxxxxx',
	'db'   => 'xxxxxxxxx',
	'host' => 'xxxxxxxxx'
];


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */

require( '../ajax/ssp.class.php' );

echo json_encode(
	SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
);
?>