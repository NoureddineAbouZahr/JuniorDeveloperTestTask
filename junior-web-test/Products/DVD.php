<?php
namespace Backend\Products;

use Backend\Product;

class DVD extends Product
{
    public function fromData($Data)
    {
        if (!isset($Data["size"])) {
            throw new \Exception("You must provide Size", 1);
        }
        $this->size = $Data["size"];

    }
}

?>