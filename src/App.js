import { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import "@fontsource/roboto"

import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import Products from "./components/Products"
import ProductItemDetails from "./components/ProductItemDetails"
import Cart from "./components/Cart"
import NotFound from "./components/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import CartContext from "./context/CartContext"

import "./App.css"

class App extends Component {
  state = {
    cartList: [],
  }

  checkProductPresentInCart = (id) => {
    const { cartList } = this.state
    let isProductPresent = false
    cartList.map((cartItem) => {
      if (cartItem.id === id) {
        isProductPresent = true
      }
    })
    return isProductPresent
  }

  // eslint-disable-next-line no-dupe-class-members
  addCartItem = (product) => {
    const isProductPresent = this.checkProductPresentInCart(product.id)
    if (isProductPresent) {
      this.setState((prevState) => ({
        cartList: prevState.cartList.map((cartItem) => {
          if (cartItem.id === product.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + product.quantity,
            }
          }
          return cartItem
        }),
      }))
    } else {
      this.setState((prevState) => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        }
        return cartItem
      }),
    }))
  }

  decrementCartItemQuantity = (id, quantity) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((cartItem) => {
        if (cartItem.id === id && quantity === 1) {
          this.removeCartItem(id)
        } else if (cartItem.id === id && quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 }
        }
        return cartItem
      }),
    }))
  }

  removeCartItem = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter((cartItem) => cartItem.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState((prevState) => ({
      cartList: [],
    }))
  }

  render() {
    const { cartList } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        {console.log(cartList)}
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={ProductItemDetails} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
