<?php
//this file will be required on every PHP page
session_start();

$GLOBALS['config'] = [
	'mysql' => [
		'host' => 'xxxxxxx',
		'username' => 'xxxxxx',
		'password' => 'xxxxxx',
		'db' => 'xxxxxx'
	],
	'remember' => [
		'cookie_name' => 'xxxx',
		'cookie_expiry' => 'xxxxx'
	],
	'session' => [
		'session_name' => 'xxxx',
		'token_name' => 'xxxx'
	]
];

spl_autoload_register(function($class){
	require_once 'classes/' . $class . '.php';
});

require_once 'sanitize.php';

?>