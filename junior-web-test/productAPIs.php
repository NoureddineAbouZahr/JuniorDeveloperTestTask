<?php
namespace Backend;

header('Access-Control-Allow-Origin');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include 'autoloader.php';
use Backend\Product;

if ($_SERVER['REQUEST_METHOD'] === 'POST' and $_POST["action"] == "add") {
    if (!empty($_POST['name']) && !empty($_POST['price']) && !empty($_POST['type'])) {
        $name = $_POST['name'];
        $type = $_POST['type'];
        $price = $_POST['price'];


        $product = Product::fromType($type, $name, $price);
        $product->fromData($_POST);
        $product->AddProduct();
    } else {
        echo "no";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($_GET["action"] == "get_types") {
        echo json_encode(Product::$types);
    } else if ($_GET["action"] == "get_products") {
        Product::GetProduct();
    }

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' and $_POST["action"] == "delete") {
    $skus = $_POST['skus'];

    $skus = json_decode($skus, TRUE);

    Product::DeleteProduct($skus);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' and $_POST["action"] == "get") {
    $sku = $_POST['sku'];


    Product::GetProductbySKU($sku);


} else {
    echo "Invalid request method.";
}
?>