import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import ServiceCartItems from "./ServiceCartItems"
import ServiceCartAmount from "./ServiceCartAmount"

class ServiceCart extends React.Component {
  state = {
    coupanCode: '',
    service_cart_items: [],
    totalEstimatedTime: 0,
    totalEstimatedCostLabor: 0,
    totalEstimatedCostPart: 0,
    netPayable: 0,
    discount: 0,
    checkout: false,
    cartItemsCount: 0
  }

  constructor(props) {
    super(props);

    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  redirectPage() {
    location.href = "/services/new"
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
        <main className="cart-m repair-order-summary order-summary">
          <div className="cart-d">
            <div className="cart-top">
              <h1>Quote and Repair Time</h1>
              <button onClick={this.redirectPage} type="button" name="button">Add New Services</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                <ServiceCartItems updateState={this.updateState} checkout={this.state.checkout}/>
              </div>
              <hr></hr>
              <div className="checkout-side">
                <ServiceCartAmount cartItemsCount={this.state.cartItemsCount}
                  updateState={this.updateState}
                  totalEstimatedCostLabor={this.state.totalEstimatedCostLabor}
                  totalEstimatedCostPart={this.state.totalEstimatedCostPart}
                  totalEstimatedTime={this.state.totalEstimatedTime}
                  netPayable={this.state.netPayable} checkout={this.state.checkout}/>
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default ServiceCart
