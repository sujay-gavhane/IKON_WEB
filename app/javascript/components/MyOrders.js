import React from "react"
import PropTypes from "prop-types"
import Product2 from 'images/product2.jpg'
import axios from 'axios';
class MyOrders extends React.Component {
  state = {
    orders: []
  }

  constructor(props) {
    super(props);

    this.getOrders = this.getOrders.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
    this.getOrders();
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  getOrders(addressId){
    axios
      .get("/orders.json")
        .then(res => {
          this.setState({orders: res.data.orders})
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  redirectPage() {
    location.href = "/products"
  }

  cancelOrder() {
    var orderID = event.target.closest('a').dataset.id
    axios
      .delete("/orders/" + orderID + ".json")
        .then(res => {
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  render () {
    const orders = this.state.orders.map((order) =>
      <a key={order.id} data-id={order.id} href={"/orders/" + order.id}>
        <div className="cart-item">
          <div className="titles" title="Detail">
            {order.user_carts.map((user_cart) => 
              <h3 key={user_cart.id}>{user_cart.quantity} &times; {user_cart.product.name}</h3>
            )}
          </div>
          <div className="quantity" title="Quantity">
            <h5>Placed on: <span>{new Date(order.created_at).toLocaleString()} </span> </h5>
          </div>
          <div className="total-price" title="Totla Price">
            <h4>${order.net_amount}</h4>
          </div>
          <div className="status" title="Status">
            <h5>{order.status}</h5>
          </div>
          <div className="cancel" title="Return">
          {
            order.status != 'Canceled' &&
              <button onClick={this.cancelOrder} className="checkout-btn" type="button" name="button">Cancel</button>
          }
          </div>
          
        </div>
      </a>
      
    )
    return (
      <React.Fragment>
        <main className="cart-m my-orders">
          <div className="cart-d">
            <div className="cart-top">
              <h1>My Orders</h1>
              <button onClick={this.redirectPage} type="button" name="button">Continue Shoping</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                {orders}
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default MyOrders
