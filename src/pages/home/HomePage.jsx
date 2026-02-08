import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage() {
  return (
    <>
      <link rel="icon" href="/images/favicon/home-favicon.png" />
      <title>E-Commerce</title>

      <Header />
      <div className="home-page">
        <ProductsGrid />
      </div>
    </>
  );
}
