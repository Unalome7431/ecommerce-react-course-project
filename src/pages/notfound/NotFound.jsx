import { Header } from "../../components/Header";
import './NotFound.css'

export function NotFound({ cartItems }) {

  return (
    <>
      <title>404: Page Not Found</title>

      <Header cartItems={cartItems}/>
      <div className="notFoundMessageBox">
        <span className="notFoundText">404</span>
        <span className="notFoundDesc">Page Not Found</span>
      </div>
    </>
  )
}