import { useState, useEffect } from "react";
import axios from "axios";
import "./Checkout.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import { Seo } from "../../components/Seo";

export function Checkout({ cartItems, loadCartItems }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };

    fetchAppData();
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    }

    fetchAppData();
  }, [cartItems])

  return (
    <>
      <Seo title='Checkout' icon="/images/cart-favicon.png" />

      <CheckoutHeader cartItems={cartItems} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cartItems={cartItems}
            deliveryOptions={deliveryOptions}
            loadCartItems={loadCartItems}
          />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
