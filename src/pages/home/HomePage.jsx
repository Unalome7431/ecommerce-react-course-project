import { useSearchParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { Seo } from "../../components/Seo";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cartItems, loadCartItems }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  return (
    <>
      <Seo title="E-Commerce" icon="/images/home-favicon.png" />

      <Header cartItems={cartItems} />
      <div className="home-page">
        <ProductsGrid loadCartItems={loadCartItems} search={search} />
      </div>
    </>
  );
}
