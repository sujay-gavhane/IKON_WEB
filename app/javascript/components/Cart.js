import React from "react"
import PropTypes from "prop-types"
import CartItems from "./CartItems"
import axios from 'axios';

class Cart extends React.Component {

  constructor(props) {
    super(props);

    this.setCsrfToken = this.setCsrfToken.bind(this);
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  redirectPage() {
    location.href = "/products"
  }
  
  render () {
    return (
      <React.Fragment>
        <main className="cart-m">
          <div className="cart-d">
            <div className="cart-top">
              <h1>Shoping Cart</h1>
              <button onClick={this.redirectPage} type="button" name="button">Continue Shoping</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                <CartItems />
              </div>
              <hr></hr>
              <div className="checkout-side">
                <div className="">
                  <h1>Total Amount:</h1>
                  <h2>$100</h2>
                  <div className="coupan-code">
                    <input type="text" name="" placeholder="coupan"></input>
                    <button type="button" name="button">Apply</button>
                  </div>
                  <h1>Coupan Discount:</h1>
                  <h2>$20</h2>

                  <hr></hr>

                  <h1>Net Payment:</h1>
                  <h2>$80</h2>
                  <button className="checkout-btn" type="button" name="button">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Cart
