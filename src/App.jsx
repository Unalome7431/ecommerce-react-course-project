import { Routes, Route, useParams } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Checkout } from "./pages/checkout/Checkout";
import { Orders } from "./pages/orders/Orders";
import { Tracking } from "./pages/tracking/Tracking";
import { NotFound } from "./pages/notfound/NotFound";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { orderId, productId } = useParams();

  const loadCartItems = async () => {
    let response = await axios.get("/api/cart-items?expand=product");
    setCartItems(response.data);
  };

  useEffect(() => {
    loadCartItems();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems} loadCartItems={loadCartItems} />}/>
        <Route path="checkout" element={<Checkout cartItems={cartItems} loadCartItems={loadCartItems} />} />
        <Route path="orders" element={<Orders cartItems={cartItems} loadCartItems={loadCartItems} />} />
        <Route path="tracking/:orderId/:productId" element={<Tracking cartItems={cartItems} />}/>
        <Route path="*" element={<NotFound cartItems={cartItems} />} />
      </Routes>
    </>
  );
}

export default App;
