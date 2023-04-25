import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import axios from "axios";

const MainStore = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get("http://localhost:4000/products")
        .then((res) => setProducts(res.data))
        .catch((error) => console.log(error));
    };
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {products.map((product) => {
        return (
          <div>
            <div key={product.id} className="grid grid-cols-3">
              <div className="block">
                <img src={product.img} alt="thumbnail" className="h-40" />
                <h1>{product.name}</h1>
                <p>
                  {product.price}
                  <strong>$</strong>
                </p>
                <p>{product.description}/{product.amount}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainStore;
