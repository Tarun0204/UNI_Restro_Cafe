import Header from "../Header";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";
import CartSummary from "../CartSummary";
import CartContext from "../../context/CartContext";
import "./index.css";

const Cart = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value;
      const { removeAllCartItems, decrementCartItemQuantity } = value;
      const showEmptyView = cartList.length === 0;

      const onRemoveAllCartItems = () => {
        removeAllCartItems();
      };

      const onDecrementQuantity = (dishId) => {
        decrementCartItemQuantity(dishId);
      };

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onRemoveAllCartItems}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView onDecrementQuantity={onDecrementQuantity} />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      );
    }}
  </CartContext.Consumer>
);

export default Cart;
