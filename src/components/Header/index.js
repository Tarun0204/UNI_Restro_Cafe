import { useContext } from 'react'
import Cookies from 'js-cookie'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Popup from 'reactjs-popup'
import { Link, useNavigate } from 'react-router-dom'  // Import useNavigate here
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => {
  const navigate = useNavigate() // Initialize useNavigate hook

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login') // Use navigate to redirect to the login page
  }

  const { cartList, restaurantName } = useContext(CartContext)

  const renderCartItemsIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button type="button" className="cart-icon-button" aria-label="Cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </button>
      </Link>
      <div className="cart-count-badge">
        <p className="cart-count">
          {cartList.reduce((total, item) => total + item.quantity, 0)}
        </p>
      </div>
    </div>
  )

  return (
    <header className="nav-header">
      <Link to="/" className="logo-link">
        <h1 className="logo-heading">{restaurantName || 'UNI Restro Cafe'}</h1>
      </Link>
      <div className="header-link-items">
        <p className="link-para">My Orders</p>
        {renderCartItemsIcon()}
      </div>

      <div className="logout-btn">
        <Popup
          trigger={
            <button type="button" className="logout-button">
              Logout
            </button>
          }
          modal
        >
          {close => (
            <div className="modal-container">
              <p className="modal-description">
                Are you sure you want to Logout?
              </p>
              <div className="popup-buttons-container">
                <button type="button" className="close-button" onClick={close}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="confirm-button"
                  onClick={() => {
                    onClickLogout()
                    close()
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </header>
  )
}

export default Header
