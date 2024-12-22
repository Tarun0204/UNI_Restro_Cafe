import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => {
  const {cartList, restaurantName} = useContext(CartContext)
  const navigate = useNavigate()

  const renderCartItemsIcon = () => (
    <div className="cart-icon-link">
      <button
        type="button"
        className="cart-icon-button"
        aria-label="Cart"
        onClick={() => navigate('/cart')}
      >
        <AiOutlineShoppingCart className="cart-icon" />
      </button>
      <div className="cart-count-badge">
        <p className="cart-count">
          {cartList.reduce((total, item) => total + item.quantity, 0)}
        </p>
      </div>
    </div>
  )

  return (
    <header className="nav-header">
      <button
        type="button"
        className="logo-link"
        onClick={() => navigate('/')}
      >
        <h1 className="logo-heading">{restaurantName}</h1>
      </button>
      <div className="header-link-items">
        <p className="link-para">My Orders</p>
        {renderCartItemsIcon()}
      </div>
    </header>
  )
}

export default Header
