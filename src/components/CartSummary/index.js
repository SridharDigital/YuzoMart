import CartContext from "../../context/CartContext"

import "./index.css"

const CartSummary = () => (
  <CartContext.Consumer>
    {(value) => {
      const { cartList } = value

      let totalAmount = 0
      for (let i = 0; i < cartList.length; i++) {
        totalAmount += cartList[i].price * cartList[i].quantity
      }

      return (
        <div className="cart-summary-container">
          <div className="cart-summary-content-container">
            <h2 className="cart-summary-order-total">
              Order Total:{" "}
              <span className="cart-summary-order-total-highlight">
                Rs {totalAmount}/-
              </span>
            </h2>
            <p className="cart-summary-description">
              {cartList.length} items in cart
            </p>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
