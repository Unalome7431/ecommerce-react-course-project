import { useState } from "react"
import checkmarkDefault from "../../assets/images/icons/checkmark.png";
import { formatMoney } from "../../utils/money";

export function Product({ product, loadCartItems }) {
  const [quantity, setQuantity] = useState(1);

  async function addToCart(product) {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadCartItems();
  }

  function selectQuantity(event) {
    const quantity = Number(event.target.value);
    setQuantity(quantity);
  }

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={selectQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src={checkmarkDefault} />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
