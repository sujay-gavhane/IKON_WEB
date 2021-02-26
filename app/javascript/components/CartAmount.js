import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
class CartAmount extends React.Component {
  state = {
    couponMsg: '',
    discount: 0,
    coupanCode: ''
  }

  constructor(props) {
    super(props);

    this.appplyCoupon = this.appplyCoupon.bind(this);
    this.updateCheckoutState = this.updateCheckoutState.bind(this);
    this.handleCouponChnage = this.handleCouponChnage.bind(this);
  }

  appplyCoupon(){
    var coupon = document.querySelector(".coupon-input").value
    var cartID = document.getElementById('cart-id').textContent
    axios
      .put("/carts/" + cartID + "/apply_coupon.json", {code: coupon})
        .then(res => {
          this.setState({ couponMsg: res.data.msg, discount: res.data.discount })
          this.props.updateTotalAmmount(this.state.discount, 'discount', 0)
          this.props.updateTotalAmmount(this.props.totalAmount, 'netPayable', this.state.discount)
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  }

  updateCheckoutState() {
    var checkout = event.target.dataset.checkout == 'true' ? true : false
    this.props.updateTotalAmmount(checkout, 'checkout')
  }

  handleCouponChnage() {
    this.setState({coupanCode: event.target.value})
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
          <h1>Total Amount:</h1>
          <h2>${this.props.totalAmount}</h2>
          <div className="coupan-code">
            <input onChange={this.handleCouponChnage} className="coupon-input" type="text" name="" placeholder="coupan" value={this.state.coupanCode}></input>
            <button onClick={this.appplyCoupon} type="button" name="button">Apply</button>
          </div>
          <h1>Coupan Discount:</h1>
          <h2>${this.state.discount}</h2>
          {couponMsg}

          <hr></hr>

          <h1>Net Payment:</h1>
          <h2>${this.props.netPayable}</h2>
          <button data-checkout='true' onClick={this.updateCheckoutState} className="checkout-btn" type="button" name="button">Checkout</button>
        </div>
        :
          <div className="">
            <h1>Total Amount:</h1>
            <h2>${this.props.totalAmount}</h2>

            <h1>Coupan Discount:</h1>
            <h2>${this.state.discount}</h2>

            <h1>Sales Tax:</h1>
            <h2>$20</h2>

            <hr></hr>

            <h1>Net Payment:</h1>
            <h2>${this.props.netPayable}</h2>
            <div className="payment-method">
              <h1>Payment Method:</h1>
              <select className="" name="">
                <option value="">Credit Cart</option>
                <option value="">Credit Cart</option>
                <option value="">Paypal</option>
              </select>
            </div>
            <button data-checkout='false' onClick={this.updateCheckoutState} className="checkout-btn" type="button" name="button">Back to Cart</button>

          </div>
        }
      </React.Fragment>
    );
  }
}

export default CartAmount
