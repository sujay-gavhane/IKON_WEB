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
    var coupon = this.props.checkout ? document.querySelector("#coupon").textContent : document.querySelector(".coupon-input").value  
    var cartID = document.getElementById('cart-id').textContent
      axios
        .put("/carts/" + cartID + "/apply_coupon.json", {code: coupon})
          .then(res => {
            this.setState({ couponMsg: res.data.msg, discount: res.data.discount,
            couponId: res.data.coupon_id })
            this.props.updateTotalAmmount(this.state.discount, 'discount', 0)
            this.props.updateTotalAmmount(this.state.couponId, 'couponId', 0)
            if (this.props.checkout) {
              var tax = ((this.props.totalAmount - (this.state.discount)) * 7) / 100 || 0
              this.props.updateTotalAmmount(tax, 'tax', 0)
              this.props.updateTotalAmmount(this.props.totalAmount + tax, 'netPayable', this.state.discount)
            } else {
              this.props.updateTotalAmmount(this.props.totalAmount, 'netPayable', this.state.discount)
            }
          }
        )
        .catch(err => {
           console.log(err);
           return null;
         });
  }

  redirectToCheckout() {
    var cartID = document.getElementById('cart-id').textContent
    var coupon = document.querySelector(".coupon-input").value
    location.href = "/carts/" + cartID + "/checkout?code=" + coupon
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

          <h1>Amount Payable with Discount:</h1>
          <h2>${this.props.netPayable}</h2>
          { this.props.cartItemsCount && <button data-checkout='true' onClick={this.redirectToCheckout} className="checkout-btn" type="button" name="button">Checkout</button>}
        </div>
        :
          <div className="">
            <h1>Total Amount:</h1>
            <h2>${this.props.totalAmount}</h2>

            <h1>Coupon Discount:</h1>
            <h2>${this.state.discount}</h2>

            <h1>Total:</h1>
            <h2>${this.props.totalAmount - this.state.discount}</h2>

            <hr></hr>

            <h1>Tax:</h1>
            <h2>${this.props.tax}</h2>

            <h1>Net Payment:</h1>
            <h2>${this.props.netPayable}</h2>
            <hr></hr>
            
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

export default CartAmount
