<?php
namespace Backend\Products;

use Backend\Product;


class Book extends Product
{
    public function fromData($Data)
    {
        if (!isset($Data["weight"])) {
            throw new \Exception("You must provide weight", 1);
        }
        $this->weight = $Data["weight"];
    }
}

?>