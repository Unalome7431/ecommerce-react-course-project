import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./Product";

export function ProductsGrid({ loadCartItems, search }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get("/api/products", {
        params: search ? { search } : {},
      });
      setProducts(response.data);
    };

    fetchAppData();
  }, [search]);

  return (
    <div className="products-grid">
      {!products ? (
        <div>Loading products...</div>
      ) : (
        products.map((product) => (
          <Product
            product={product}
            loadCartItems={loadCartItems}
            key={product.id}
          />
        ))
      )}
    </div>
  );
}
