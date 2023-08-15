import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link if you still need it
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState([]);

    const deleteProducts = () => {
        if (checkedProducts.length === 0) {
            alert("Please select products to delete.");
            return;
        }

        const skusToDelete = checkedProducts;

        const formdata = new FormData();
        let data = {
            skus: JSON.stringify(skusToDelete),
            action: "delete",
        };

        for (let key in data) {
            formdata.append(key, data[key]);
        }

        axios({
            method: "post",
            url: "http://localhost/junior-web-test/productAPIs.php",
            data: formdata,
        })
            .then(function (response) {
                console.log(skusToDelete);
                console.log("Products deleted successfully");
                window.location.reload();
            })
            .catch(function (error) {
                console.error("Error deleting products:", error);
            });
    };

    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch("http://localhost/junior-web-test/productAPIs.php?action=get_products");
            const data = await res.json();
            const filteredData = data.map((obj) =>
                Object.keys(obj).reduce((acc, key) => {
                    if (obj[key] !== null) {
                        acc[key] = obj[key];
                    }
                    return acc;
                }, {})
            );

            setProducts(filteredData);
        };

        getProducts();
    }, []);

    const handleCheckboxChange = (sku) => {
        setCheckedProducts((prevCheckedProducts) => {
            if (prevCheckedProducts.includes(sku)) {
                return prevCheckedProducts.filter((item) => item !== sku);
            } else {
                return [...prevCheckedProducts, sku];
            }
        });
    };

    const handleProductClick = (product) => {
        window.location.href = `/product/${product.SKU}`;
    };

    return (
        <div>
            <div className="header">
                <h1>Product List</h1>
                <div className="action-buttons">
                    <Link to="/addProduct">
                        <button>Add</button>
                    </Link>
                    <button onClick={deleteProducts}>Mass Delete</button>
                </div>
            </div>

            <div className="pContainer">
                {products.map((product) => (
                    <div key={product.SKU} className="productCard" onClick={() => handleProductClick(product)}>
                        <input
                            type="checkbox"
                            className="delete-checkbox"
                            checked={checkedProducts.includes(product.SKU)}
                            onChange={() => handleCheckboxChange(product.SKU)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <h1>SKU: {product.SKU}</h1>
                        <h1>{product.Name}</h1>
                        <h1>{product.Price} $</h1>
                        <h1>{product.Size}</h1>
                        <h1>{product.Dimensions}</h1>
                        <h1>{product.Weight}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
