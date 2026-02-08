import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import { Checkout } from './pages/checkout/Checkout'
import { Orders } from './pages/orders/Orders'
import { Tracking } from './pages/Tracking'
import { NotFound } from './pages/NotFound'

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      let response = await axios.get("/api/cart-items?expand=product");
      setCartItems(response.data);
    };

    fetchAppData();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems}/>} />
        <Route path='checkout' element={<Checkout cartItems={cartItems}/>} />
        <Route path='orders' element={<Orders cartItems={cartItems}/>} />
        <Route path='tracking' element={<Tracking cartItems={cartItems}/>} />
        <Route path='*' element={<NotFound cartItems={cartItems}/>} />
      </Routes>
    </>
  )
}

export default App
