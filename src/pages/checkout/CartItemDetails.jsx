import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCartItems }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [quantity, setQuantity] = useState(cartItem.quantity)

  async function deleteProduct() {
    await axios.delete(`/api/cart-items/${cartItem.productId}`, {
      productId: cartItem.productId
    })
    await loadCartItems()
  }

  async function updateQuantity() {
    if (isUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        productId: cartItem.productId,
        quantity
      })
      await loadCartItems()
    }

    setIsUpdating(!isUpdating)
  }

  async function handleUpdateKeyDown(event) {
    if (event.key === 'Enter') {
      setNewQuantity(event)
      updateQuantity()
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity)
      setIsUpdating(false)
    }
  }

  function setNewQuantity(event) {
    setQuantity(Number(event.target.value))
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating 
            ? <input className='quantity-textbox' type="text" value={quantity} onChange={setNewQuantity} onKeyDown={handleUpdateKeyDown} />
            : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity}>Update</span>
          <span className="delete-quantity-link link-primary" onClick={deleteProduct}>Delete</span>
        </div>
      </div>
    </>
  );
}
