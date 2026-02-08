import { useEffect, useState } from "react";
import "./Checkout.css";
import { CheckoutHeader } from "./CheckoutHeader";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";

export function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([])

  useEffect(() => {
    const fetchAppData = async () => {
      let response = await axios.get("/api/cart-items?expand=product");
      setCartItems(response.data);

      response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
      setDeliveryOptions(response.data);

      response = await axios.get("/api/payment-summary")
      setPaymentSummary(response.data)
    };

    fetchAppData();
  }, []);

  return (
    <>
      <link rel="icon" href="/images/favicon/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartItems.map((cartItem) => {
              const deliveryDate = deliveryOptions.find((deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId
              })

              return (
              <div className="cart-item-container" key={cartItem.productId}>
                <div className="delivery-date">
                  Delivery date: {dayjs(deliveryDate?.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
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
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>
                      <span className="update-quantity-link link-primary">
                        Update
                      </span>
                      <span className="delete-quantity-link link-primary">
                        Delete
                      </span>
                    </div>
                  </div>

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
                              {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
                            </div>
                            <div className="delivery-option-price">
                              {deliveryOption.priceCents > 0 
                                ? `${formatMoney(deliveryOption.priceCents)}`
                                : 'FREE'
                              } Shipping
                            </div>
                          </div>
                        </div>
                      )})}
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items ({paymentSummary.totalItems}):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
