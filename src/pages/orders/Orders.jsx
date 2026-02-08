import { Header } from "../../components/Header";
import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrdersGrid } from "./OrdersGrid";

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
      <link rel="icon" href="/images/favicon/orders-favicon.png" />
      <title>Orders</title>

      <Header cartItems={cartItems}/>
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
