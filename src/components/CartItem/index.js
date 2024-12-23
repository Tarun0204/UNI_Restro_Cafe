import { useContext } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import CartContext from "../../context/CartContext";
import "./index.css";

const CartItem = ({ cartItemDetails }) => {
  const {
    dishId,
    dishName,
    dishImage,
    quantity,
    dishCurrency,
    dishPrice,
    dishDescription,
  } = cartItemDetails;

  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);

  const onIncreaseQuantity = () => incrementCartItemQuantity(dishId);
  const onDecreaseQuantity = () => decrementCartItemQuantity(dishId);
  const onRemoveCartItem = () => removeCartItem(dishId);

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{dishName}</p>
          <p className="cart-product-description">{dishDescription}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onDecreaseQuantity}
            data-testid="minus"
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onIncreaseQuantity}
            data-testid="plus"
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">
            {dishCurrency} {(quantity * dishPrice).toFixed(2)} /-
          </p>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove"
      >
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default CartItem;
