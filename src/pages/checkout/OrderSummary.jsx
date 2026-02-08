import { DeliveryOption } from './DeliveryOption';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({ cartItems, deliveryOptions}) {
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
