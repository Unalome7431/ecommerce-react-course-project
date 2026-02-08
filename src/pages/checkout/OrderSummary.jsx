import { useState, useEffect } from 'react'
import axios from 'axios';
import { DeliveryOption } from './DeliveryOption';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

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
            <DeliveryDate deliveryDate={deliveryDate} />

            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} />
              <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
