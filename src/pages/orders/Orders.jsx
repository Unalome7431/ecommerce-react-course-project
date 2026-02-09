import { Header } from "../../components/Header";
import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrdersGrid } from "./OrdersGrid";
import { Seo } from "../../components/Seo";

export function Orders({ cartItems }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      let response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };

    fetchAppData();
  }, []);

  return (
    <>
      <Seo title="Orders" icon="/images/orders-favicon.png" />

      <Header cartItems={cartItems} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
