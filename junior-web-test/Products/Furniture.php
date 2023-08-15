<?php

namespace Backend\Products;

use Backend\Product;

class Furniture extends Product
{
    public function fromData($Data)
    {
        if (!isset($Data["dimensions"])) {
            throw new \Exception("You must provide dimensions", 1);
        }
        $this->dimensions = $Data["dimensions"];
    }
}

?>