import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cartItems, loadCartItems }) {
  return (
    <>
      <link rel="icon" href="/images/favicon/home-favicon.png" />
      <title>E-Commerce</title>

      <Header cartItems={cartItems}/>
      <div className="home-page">
        <ProductsGrid loadCartItems={loadCartItems} />
      </div>
    </>
  );
}
