import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./Product";

export function ProductsGrid({ loadCartItems }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAppData();
  }, []);

  return (
    <div className="products-grid">
      {!products ? (
        <div>Loading products...</div>
      ) : (
        products.map((product) => (
          <Product product={product} loadCartItems={loadCartItems} key={product.id} />
        ))
      )}
    </div>
  );
}
