import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOption({ deliveryOptions, cartItem }) {

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
        {deliveryOptions.map((deliveryOption) => {
          return (
            <div className="delivery-option" key={deliveryOption.id}>
              <input
                type="radio"
                checked={deliveryOption.id === cartItem.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
              />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM, D",
                  )}
                </div>
                <div className="delivery-option-price">
                  {deliveryOption.priceCents > 0
                    ? `${formatMoney(deliveryOption.priceCents)}`
                    : "FREE"}{" "}
                  Shipping
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
