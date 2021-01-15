<?php


class DB 
{
    // return a pdo database object
    public static function dbConnect() {
        include_once('db-info.php');
        
        try {
            // connect to database
            $pdo = new PDO("mysql:host=$host;dbname=$dbName",$user,$password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            return $pdo;
            
        } catch(PDOexception $e) {
            return 0;
        }
    }
}


?>