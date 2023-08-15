<?php

namespace Backend;

include 'autoloader.php';

use Backend\Products\DVD;
use Backend\Products\Book;
use Backend\Products\Furniture;
use Backend\Utils\Connection;


const classByType = [
    "DVD" => DVD::class,
    "Furniture" => Furniture::class,
    "Book" => Book::class,
];

foreach (classByType as $key => $value) {
    array_push(Product::$types, $key);
}
abstract class Product
{
    public static $types = [];

    protected $SKU;

    protected $name;
    protected $price;
    protected $type;
    public $size = null;
    public $dimensions = null;
    public $weight = null;
    abstract public function fromData($Data);

    public static function fromType($type, $name, $price): Product
    {
        if (!isset(classByType[$type])) {
            throw new \Exception("Invalid product type", 1);
        }
        $class = classByType[$type];
        return new $class($name, $price, $type);
    }

    public function __construct($Name, $Price, $type)
    {
        $this->generateSKU();
        $this->name = $Name;
        $this->price = $Price;
        $this->type = $type;
    }
    public function generateSKU()
    {
        $mysqli = Connection::connect();

        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $skuLength = 8;
        $sku = '';

        for ($i = 0; $i < $skuLength; $i++) {
            $randomIndex = mt_rand(0, strlen($characters) - 1);
            $sku .= $characters[$randomIndex];
        }
        $queryCheck = $mysqli->prepare("Select Count(*) FROM product WHERE SKU=?");
        $queryCheck->bind_param("s", $sku);
        $queryCheck->execute();
        $queryCheck->bind_result($count);
        $queryCheck->fetch();

        while ($count > 0) {
            for ($i = 0; $i < $skuLength; $i++) {
                $randomIndex = mt_rand(0, strlen($characters) - 1);
                $sku[$i] = $characters[$randomIndex];
            }
            $queryCheck->execute();
            $queryCheck->bind_result($count);
            $queryCheck->fetch();
        }
        $this->SKU = $sku;
        $queryCheck->close();
        $mysqli->close();


    }
    public function AddProduct()
    {
        $mysqli = Connection::connect();

        $this->generateSKU();
        $queryAdd = $mysqli->prepare("INSERT INTO product (SKU, Name, Price, Size,Weight, Dimensions, Type) VALUES (?,?,?,?,?,?,?)");
        $queryAdd->bind_param("sssssss", $this->SKU, $this->name, $this->price, $this->size, $this->weight, $this->dimensions, $this->type);
        $queryAdd->execute();
        echo "Success";
        $queryAdd->close();
        $mysqli->close();
    }

    public static function GetProduct()
    {
        $mysqli = Connection::connect();

        $query = $mysqli->prepare("Select * from product");
        $query->execute();
        $array = $query->get_result();
        $response = [];
        while ($all = $array->fetch_assoc()) {
            $response[] = $all;
        }
        $json = json_encode($response);
        echo $json;



    }
    public static function GetProductbySKU($SKU)
    {
        $mysqli = Connection::connect();

        $query = $mysqli->prepare("Select * from product where SKU = ?");
        $query->bind_param("s", $SKU);
        $query->execute();
        $array = $query->get_result();
        $response = [];
        while ($all = $array->fetch_assoc()) {
            $response[] = $all;
        }
        $json = json_encode($response);
        echo $json;



    }
    public static function DeleteProduct($skus)
    {
        $mysqli = Connection::connect();


        $skus = array_map(function ($element) {
            global $mysqli;

            return '"' . addslashes($element) . '"';
        }, $skus);
        $list = implode(',', $skus);
        echo "DELETE from product where SKU IN ($list)";

        $query = $mysqli->prepare("DELETE from product where SKU IN ($list)");
        $query->execute();
        $response = [];
        $response["success"] = true;
        echo json_encode($response);


    }
}




?>