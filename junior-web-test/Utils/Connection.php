<?php
namespace Backend\Utils;
class Connection{
    public static function connect(){
        $host = "localhost";
    $db_user = "root";
    $db_pass = null;
    $db_name = "juniortestnoureddineabouzahr";

    $mysqli = new \mysqli($host, $db_user, $db_pass, $db_name);
    return $mysqli;

    }

    
}

?>