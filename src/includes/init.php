<?php
//this file will be required on every PHP page
session_start();

$GLOBALS['config'] = [
	'mysql' => [
		'host' => '',
		'username' => '',
		'password' => '',
		'db' => ''
	],
	'remember' => [
		'cookie_name' => '',
		'cookie_expiry' => ''
	],
	'session' => [
		'session_name' => '',
		'token_name' => ''
	]
];

spl_autoload_register(function($class){
	require_once 'classes/' . $class . '.php';
});

require_once 'sanitize.php';

?>