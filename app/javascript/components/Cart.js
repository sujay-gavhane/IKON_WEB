import React from "react"
import PropTypes from "prop-types"
import CartItems from "./CartItems"
import SelectAddress from "./SelectAddress"
import CartAmount from "./CartAmount"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class Cart extends React.Component {
  state = {
    totalAmount: 0,
    couponMsg: '',
    netPayable: 0,
    discount: 0,
    checkout: false,
    toggleAddressPopup: '',
    selectedAddress: {}
  }

  constructor(props) {
    super(props);

    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.updateState = this.updateState.bind(this);
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

  updateState(value, name, discount) {
    if(name == 'netPayable' && this.state.discount > 0){
      value = value - this.state.discount
    }
    this.setState({[name]: value})
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
                <CartItems updateTotalAmmount={this.updateState} checkout={this.state.checkout}/>
              </div>
              <hr></hr>
              <div className="checkout-side">
                <CartAmount updateTotalAmmount={this.updateState} totalAmount={this.state.totalAmount} netPayable={this.state.netPayable} checkout={this.state.checkout}/>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Cart
