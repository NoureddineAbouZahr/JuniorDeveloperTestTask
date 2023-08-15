import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { sku } = useParams();
  const formdata = new FormData();
  formdata.append("sku", sku);
  formdata.append("action", "get");

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await axios.post("http://localhost/junior-web-test/productAPIs.php", formdata);
        const data = response.data;

        setProduct(data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);

      }
    };

    getProductData();
  }, [formdata]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No data found</div>;
  }
  return (
    <div>
      {product.map((p) => (
        <div>
          <h1>{p.Name}</h1>
          <h1>{p.SKU}</h1>
          <h1>{p.Type}</h1>
          <h1>{p.Size}</h1>
          <h1>{p.Wright}</h1>
          <h1>{p.Dimensions}</h1>
          <h1>Price: {p.Price}</h1>

        </div>
      ))}
    </div>
  );
};

export default Product;
