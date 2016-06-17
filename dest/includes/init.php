<?php
//this file will be required on every PHP page
session_start();

$GLOBALS['config'] = [
	'mysql' => [
		'host' => 'xxxxxxxx',
		'username' => 'xxxxxxxx',
		'password' => 'xxxxxxxx',
		'db' => 'xxxxxxxx'
	],
	'remember' => [
		'cookie_name' => 'hash',
		'cookie_expiry' => '604800'
	],
	'session' => [
		'session_name' => 'user',
		'token_name' => 'token'
	]
];

spl_autoload_register(function($class){
	require_once 'classes/' . $class . '.php';
});

require_once 'sanitize.php';

?>