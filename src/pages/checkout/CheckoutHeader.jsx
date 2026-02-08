import { Link } from 'react-router-dom'
import logoDefault from '../../assets/images/logo.png'
import mobileLogoDefault from '../../assets/images/mobile-logo.png'
import checkoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'
import './CheckoutHeader.css'

export function CheckoutHeader({ cartItems }) {

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src={logoDefault} />
            <img className="mobile-logo" src={mobileLogoDefault} />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/">{cartItems.reduce((acc, cartItem) => { //acc = accumulator
              return acc + cartItem.quantity
            }, 0)} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={checkoutLockIcon} />
        </div>
      </div>
    </div>
  )
}