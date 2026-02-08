import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import "./Tracking.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function Tracking({ cartItems }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const { orderId, productId } = useParams();

  useEffect(() => {
    const fetchAppData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrderDetails(response.data);
    };

    fetchAppData();
  }, [orderId]);

  if (!orderDetails) return null;

  const order = orderDetails.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs = order.estimatedDeliveryTimeMs - orderDetails.orderTimeMs;
  const timePassed = dayjs().valueOf() - orderDetails.orderTimeMs;
  const deliveryPercent = (timePassed / totalDeliveryTimeMs) * 100;

  const isPreparing = deliveryPercent < 33
  const isShipping = deliveryPercent <= 33 && deliveryPercent < 100
  const isDelivered = deliveryPercent >= 100

  return (
    <>
      <link rel="icon" href="/images/favicon/tracking-favicon.png" />
      <title>Tracking</title>

      <Header cartItems={cartItems} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? "Delivered on" : "Arrived on"} {dayjs(order.estimatedDeliveryTimeMs).format("MMMM D")}
          </div>

          <div className="product-info">{order.product.name}</div>

          <div className="product-info">Quantity: {order.quantity}</div>

          <img className="product-image" src={order.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipping && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${deliveryPercent > 100 ? "100" : deliveryPercent}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
