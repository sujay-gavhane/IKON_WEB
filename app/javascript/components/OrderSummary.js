import React from "react"
import PropTypes from "prop-types"
import Product2 from 'images/product2.jpg'
import OrderAmount from "./OrderAmount"
import axios from 'axios';
class OrderSummary extends React.Component {
  state = {
    orderItems: [],
    order: {},
    address: {}
  }

  constructor(props) {
    super(props);

    this.getOrderItems = this.getOrderItems.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.getOrderItems();
  }

  getOrderItems(){
    var orderID = document.getElementById('order-id').textContent
    axios
      .get("/orders/" + orderID + ".json")
        .then(res => {
          this.setState({ 
            orderItems: res.data.order_items,
            order: res.data.order,
            address: res.data.address,
            discount: res.data.discount,
            status: res.data.status
          })
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  }

  redirectPage() {
    var cartID = document.getElementById('cart-id').textContent
    location.href = "/carts/" + cartID
  }

  updateState(name, value){
    this.setState({[name]: value})
  }

  render () {
    const orderItems = this.state.orderItems.map((item) => 
      <div key={item.id} className="cart-item">
        <div className="img">
          <img src={Product2} alt="product"></img>
        </div>
        <div className="titles">
          <h2>{item.product.name}</h2>
          <h3>{item.category_name}</h3>
          <span>{item.color.name}</span>
        </div>
        <div className="quantity">
          <h5>Quantity: {item.quantity}</h5>
        </div>
        <div className="total-price">
          <h4>${item.quantity * item.product.price}</h4>
        </div>
      </div>
    )
    return (
      <React.Fragment>
        <main className="cart-m order-summary">
          <div className="cart-d">
            <div className="cart-top">
              <h1>Order Summary</h1>
              <button onClick={this.redirectPage} type="button" name="button">Back to Cart</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                {orderItems}
              </div>
              <hr></hr>
              <OrderAmount updateAddress={this.updateState} status={this.state.status} address={this.state.address} discount={this.state.discount} order={this.state.order} />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default OrderSummary
