import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

class ServiceCart extends React.Component {
  state = {
    coupanCode: '',
    service_cart_items: []
  }

  constructor(props) {
    super(props);

    this.handleCouponChnage = this.handleCouponChnage.bind(this);
    this.destroy = this.destroy.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
    this.getCartItems();
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleCouponChnage() {
    this.setState({coupanCode: event.target.value})
  }

  getCartItems = () => {
    var cartID = document.getElementById('cart-id').textContent
    var totalAmount = 0
    axios
      .get("/service_carts/" + cartID + ".json")
        .then(res => {
          this.setState({ service_cart_items: res.data.service_cart_items })
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  };

  destroy(){
    var confirmDelete = confirm("Are you sure you want to delete?");
    var cartItemId = event.target.closest("a").className;
    if (confirmDelete) {
      axios
        .delete("/service_carts/" + cartItemId + ".json")
          .then(res => {
            this.getCartItems();
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  redirectPage() {
    location.href = "/services/new"
  }

  render () {
    const serviceCartItems = this.state.service_cart_items.map((item) =>
      <div className="cart-item">
        <div className="remove">
          <a className={item.id} onClick={this.destroy}><FontAwesomeIcon icon={faTimes} /></a>
        </div>
        <div className="titles">
          <h2>Firearm Type: {item.firearm_type_name}</h2>
          <h3>Service: {item.service_type_name}</h3>
          <h3>Service Work: {item.service_work.name}</h3>
          <h3>{item.frame_work_style_of_crown && "Style Of Crown: " + item.frame_work_style_of_crown}</h3>
          <h3>{item.frame_work_hardware && "Hardware: " + item.frame_work_hardware}</h3>
          <h3>{item.barrel_work_style_of_crown && "Style Of Crown: " + item.barrel_work_style_of_crown}</h3>
          <h3>{item.barrel_work_lengthof_barrel && "Length Of Barrel: " + item.barrel_work_lengthof_barrel}</h3>
          <h3>{item.barrel_work_barrel_threads && "Barrel Threads: " + item.barrel_work_barrel_threads}</h3>
          <h3>{item.action_work_model_name && "Model Name: " + item.action_work_model_name}</h3>
          <h3>{item.stock_work_hardware_type && "Hardware Type: " + item.stock_work_hardware_type}</h3>
          <h3>{item.stock_work_hardware && "Hardware: " + item.stock_work_hardware}</h3>
        </div>
        <div className="total-price">
          <h4>Estimated Cost: ${item.service_work.estimated_cost_labor}</h4>
          <h4>Estimated Part Cost: ${item.service_work.estimated_cost_part}</h4>
          <h4>Estimated Time: ${item.service_work.estimated_time}</h4>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <main className="cart-m repair-order-summary order-summary">
          <div className="cart-d">
            <div className="cart-top">
              <h1>Quote and Repair Time</h1>
              <button onClick={this.redirectPage} type="button" name="button">Back to Cart</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                {serviceCartItems}
              </div>
              <hr></hr>
              <div className="checkout-side">
                <div className="">
                  <h1>Total Amount:</h1>
                  <h2>$100</h2>
                  <div className="coupan-code">
                    <input type="text" name="" onChange={this.handleCouponChnage} value={this.state.coupanCode} placeholder="coupan"></input>
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

export default ServiceCart
