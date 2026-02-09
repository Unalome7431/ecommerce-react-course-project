import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import cartIcon from "../assets/images/icons/cart-icon.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import logoWhite from "../assets/images/logo-white.png";
import mobileLogoWhite from "../assets/images/mobile-logo-white.png";
import "./header.css";
import { useState } from "react";

export function Header({ cartItems }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [keyword, setKeyword] = useState(search || "");
  const navigate = useNavigate();

  useEffect(() => {
    setKeyword(search || "");
  }, [search]);

  function searchKeyword() {
    if (keyword) {
      navigate(`/?search=${keyword}`);
    } else {
      navigate("/");
    }
  }

  function handleSearchKeyDown(event) {
    if (event.key === 'Enter') {
      searchKeyword()
    } else if (event.key === 'Escape') {
      setKeyword('')
      navigate("/")
    }
  }

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logoWhite} />
          <img className="mobile-logo" src={mobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        <button className="search-button" onClick={searchKeyword}>
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">
            {cartItems.reduce((acc, cartItem) => {
              return acc + cartItem.quantity;
            }, 0)}
          </div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}
