import { useState, useEffect } from 'react'
import axios from 'axios';
import "./Checkout.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);
  
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

      <CheckoutHeader cartItems={cartItems}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions}/>

          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}
