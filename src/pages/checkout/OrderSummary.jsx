import { useState, useEffect } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOption } from './DeliveryOption';

export function OrderSummary() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      let response = await axios.get("/api/cart-items?expand=product");
      setCartItems(response.data);

      response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
      setDeliveryOptions(response.data);
    };

    fetchAppData();
  }, []);

  return (
    <div className="order-summary">
      {cartItems.map((cartItem) => {
        const deliveryDate = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id === cartItem.deliveryOptionId;
        });

        return (
          <div className="cart-item-container" key={cartItem.productId}>
            <div className="delivery-date">
              Delivery date:{" "}
              {dayjs(deliveryDate?.estimatedDeliveryTimeMs).format(
                "dddd, MMMM, D",
              )}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={cartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity:{" "}
                    <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
              <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
