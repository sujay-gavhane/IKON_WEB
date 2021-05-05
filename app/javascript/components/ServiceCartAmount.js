import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
class ServiceCartAmount extends React.Component {
  state = {
    couponMsg: '',
    discount: 0,
    couponCode: ''
  }

  constructor(props) {
    super(props);

    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.appplyCoupon = this.appplyCoupon.bind(this);
    this.redirectToCheckout = this.redirectToCheckout.bind(this);
    this.handleCouponChnage = this.handleCouponChnage.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
    if(this.props.checkout) {
      this.appplyCoupon()
    }
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  appplyCoupon(){
    var coupon = this.state.couponCode  
    var cartID = document.getElementById('cart-id').textContent
    if (coupon) {
      axios
        .put("/service_carts/" + cartID + "/apply_coupon.json", {code: coupon})
          .then(res => {
            this.setState({ couponMsg: res.data.msg, discount: res.data.discount,
            couponId: res.data.coupon_id })
            this.props.updateState(this.state.discount, 'discount', 0)
            this.props.updateState(this.props.totalEstimatedCostLabor + this.props.totalEstimatedCostPart, 'netPayable', this.state.discount)
            this.props.updateState(res.data.coupon_id, 'couponId', 0)
          }
        )
        .catch(err => {
           console.log(err);
           return null;
         });
    }
  }

  redirectToCheckout() {
    var cartID = document.getElementById('cart-id').textContent
    var coupon = document.querySelector(".coupon-input").value
    location.href = "/service_carts/" + cartID + "/checkout?code=" + coupon
  }

  handleCouponChnage() {
    this.setState({couponCode: event.target.value})
  }

  render () {
    let couponMsg;
    if(this.state.couponMsg != '') {
      couponMsg = <span style={{color: 'green'}}>{this.state.couponMsg}</span>
    }
    return (
      <React.Fragment>
        { !this.props.checkout 
          ?
          <div className="">
            <h1>Total Estimated Cost Labor:</h1>
            <h2>${this.props.totalEstimatedCostLabor}</h2>
            <h1>Total Estimated Cost Parts:</h1>
            <h2>${this.props.totalEstimatedCostPart}</h2>
            <h1>Total Estimated Repair Time:</h1>
            <h2>{this.props.totalEstimatedTime && this.props.totalEstimatedTime + " Minutes"} </h2>
            <div className="coupan-code">
              <input type="text" name="" onChange={this.handleCouponChnage} value={this.state.couponCode} className="coupon-input" placeholder="coupan"></input>
              <button onClick={this.appplyCoupon} type="button" name="button">Apply</button>
            </div>
            <h1>Coupan Discount:</h1>
            <h2>${this.state.discount}</h2>
            {couponMsg}
            <hr></hr>
            <h1>Net Payment:</h1>
            <h2>${this.props.netPayable.toFixed(2)}</h2>
            {this.props.cartItemsCount > 0 && <button onClick={this.redirectToCheckout} className="checkout-btn" type="button" name="button">Checkout</button>}
          </div>
          :
          <div className="">
            <h1>Total Estimated Cost Labor:</h1>
            <h2>${this.props.totalEstimatedCostLabor}</h2>
            <h1>Total Estimated Cost Parts:</h1>
            <h2>${this.props.totalEstimatedCostPart}</h2>
            <h1>Total Estimated Repair Time:</h1>
            <h2>{this.props.totalEstimatedTime && this.props.totalEstimatedTime + " Minutes"} </h2>

            <h1>Coupan Discount:</h1>
            <h2>${this.state.discount}</h2>
            <hr></hr>
            <h1>Net Payment:</h1>
            <h2>${this.props.netPayable.toFixed(2)}</h2>
            <div className="payment-method">
              <h1>Payment Method:</h1>
              <select className="" name="">
                <option value="">Credit Card</option>
              </select>
            </div>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default ServiceCartAmount
