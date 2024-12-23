import { useState, useContext } from "react";
import "./index.css";
import CartContext from "../../context/CartContext";

const DishItem = ({ dishDetails }) => {
  const {
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails;

  const [quantity, setQuantity] = useState(0);
  const { addCartItem } = useContext(CartContext);

  const onIncreaseQuantity = () => setQuantity((prevState) => prevState + 1);

  const onDecreaseQuantity = () =>
    setQuantity((prevState) => (prevState > 0 ? prevState - 1 : 0));

  const onAddItemToCart = () => addCartItem({ ...dishDetails, quantity });

  const renderButtonsContainer = () => (
    <div className="buttons-container">
      <button type="button" onClick={onDecreaseQuantity} className="dish-btn">
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button type="button" onClick={onIncreaseQuantity} className="dish-btn">
        +
      </button>
    </div>
  );

  return (
    <li className="dish-item-container">
      <div className="left">
        <div className="dish-details-container">
          <h1 className="dish-name">{dishName}</h1>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-calories">{dishCalories} calories</p>
          <p className="dish-para">{dishDescription}</p>
          {dishAvailability && renderButtonsContainer()}
          {!dishAvailability && <p className="not-available">Not available</p>}
          {addonCat.length !== 0 && (
            <p className="custom-available">Customizations available</p>
          )}
          {quantity > 0 && (
            <button type="button" className="add-btn" onClick={onAddItemToCart}>
              ADD TO CART
            </button>
          )}
        </div>
      </div>
      <div className="right">
        <img className="dish-image" alt={dishName} src={dishImage} />
      </div>
    </li>
  );
};

export default DishItem;
