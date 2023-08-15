<?php
namespace Backend;

spl_autoload_register(function ($className) {

    $segements = explode("\\", $className);

    array_splice($segements, 0, 1);
    $path = implode("/", $segements) . '.php';


    include $path;
});


?>