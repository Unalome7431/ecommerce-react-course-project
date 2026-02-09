import { OrderDetailsGrid } from "./OrderDetailsGrid";
import { OrderHeader } from "./OrderHeader";

export function OrdersGrid({ orders, loadCartItems }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div className="order-container" key={order.id}>
            <OrderHeader order={order} />

            <OrderDetailsGrid order={order} loadCartItems={loadCartItems} />
          </div>
        );
      })}
    </div>
  );
}
