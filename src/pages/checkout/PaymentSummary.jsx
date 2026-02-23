import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router-dom";

export function PaymentSummary({ paymentSummary, loadCartItems }) {
  const navigate = useNavigate()

  async function placeOrder() {
    await axios.post('/api/orders')
    await loadCartItems()
    navigate('/orders')
  }

  return (
    <div className="payment-summary" data-testid="payment-summary-container">
      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
        <div data-testid="total-items">Items ({paymentSummary.totalItems}):</div>
        <div className="payment-summary-money" data-testid="product-cost-cents">
          {formatMoney(paymentSummary.productCostCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money" data-testid="shipping-cost-cents">
          {formatMoney(paymentSummary.shippingCostCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money" data-testid="total-cost-before-tax-cents">
          {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money" data-testid="tax-cents">
          {formatMoney(paymentSummary.taxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money" data-testid="total-cost-cents">
          {formatMoney(paymentSummary.totalCostCents)}
        </div>
      </div>

      <button className="place-order-button button-primary" data-testid="place-order-button" onClick={placeOrder}>
        Place your order
      </button>
    </div>
  );
}
