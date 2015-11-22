<?php
	try {
		$conn = new PDO ( "sqlsrv:server = tcp:klockmann.database.windows.net,1433; Database = sheep-survivor", "klockmann", "sqlP23dhimh,mwnm");
		$conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	}
	catch ( PDOException $e ) {
		print( "Error connecting to SQL Server." );
		die(print_r($e));
	}
?>