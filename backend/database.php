<?php
	// Server in diesem Format: <computer>\<instance name> oder
	// <server>,<port>, falls nicht der Standardport verwendet wird
	$server = 'klockmann.database.windows.net,1433';
	
	// Mit MSSQL verbinden
	$verbindung = mssql_connect($server, 'klockmann', 'sqlP23dhimh,mwnm');
	
	if (!$verbindung) {
		die('Beim Aufbau der Verbindung mit MSSQL ging etwas schief');
	}
	
	echo "Yeah";
?>