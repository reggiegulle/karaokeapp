<?php
//this file will be required on every PHP page
session_start();

$GLOBALS['config'] = [
	'mysql' => [
		'host' => 'xxxxxxxxx',
		'username' => 'xxxxxxxxx',
		'password' => 'xxxxxxxxx',
		'db' => 'xxxxxxxxx'
	],
	'remember' => [
		'cookie_name' => 'xxxxxxxxx',
		'cookie_expiry' => 'xxxxxxxxx'
	],
	'session' => [
		'session_name' => 'xxxxxxxxx',
		'token_name' => 'xxxxxxxxx'
	]
];

spl_autoload_register(function($class){
	require_once 'classes/' . $class . '.php';
});

require_once 'sanitize.php';

?>