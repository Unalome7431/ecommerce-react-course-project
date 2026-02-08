import "./Checkout.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function Checkout() {
  return (
    <>
      <link rel="icon" href="/images/favicon/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary />

          <PaymentSummary />
        </div>
      </div>
    </>
  );
}
