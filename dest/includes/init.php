<?php
//this file will be required on every PHP page
session_start();

$GLOBALS['config'] = [
	'mysql' => [
		'host' => 'sql310.byethost14.com',
		'username' => 'b14_15919127',
		'password' => 'Kwisatz01@kartadabH',
		'db' => 'b14_15919127_karaokeapp'
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