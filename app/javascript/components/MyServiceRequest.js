import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';

class MyServiceRequest extends React.Component {
  state = {
    page: 1,
    orders: []
  }

  constructor(props) {
    super(props);

    this.getOrders = this.getOrders.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
    this.getOrders(this.state.orders, this.state.page);
    window.addEventListener('scroll', this.trackScrolling);
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  getOrders(orders, page){
    var data = "page=" + page
    axios
      .get("/service_requests.json?" + data)
        .then(res => {
          var o = this.uniqueObjects(res.data.orders, orders)
          this.pushToCollection(o, orders)
          this.setState({orders: orders})
          this.setState({ page: page + 1 })
          this.setState({ cart: res.data.cart })
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  redirectPage() {
    location.href = "/services/new"
  }

  cancelOrder() {
    event.stopPropagation();
    var orderID = event.target.closest('a').dataset.id
    axios
      .delete("/service_requests/" + orderID + ".json")
        .then(res => {
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementsByTagName('body')[0];
    if (this.isBottom(wrappedElement)) {
      this.getOrders(this.state.orders, this.state.page);
    }
  };

  isBottom(el) {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight
  }

  pushToCollection(collection, original_collection){
    collection.map((c) =>{original_collection.push(c)})
  }

  uniqueObjects(orders, order_collection){
    var isPresent = false
    return orders.filter((p) => {
      order_collection.map((c) => { 
        if (c.id == p.id) {
          isPresent = true
        } 
      })
      if (isPresent) {
        isPresent = false
        return false
      } else {
        return true
      }
    })
  }

  render () {
    const orders = this.state.orders.map((order) =>
      <a key={order.id} data-id={order.id} href={"/service_requests/" + order.id}>
        <div className="cart-item">
          <div className="titles" title="Detail">
            {order.service_cart_items.map((item) =>
              <h3 key={item.id}>{item.firearm_type}: {item.service_type}</h3>
            )}
          </div>
          <div className="quantity" title="Quantity">
            <h5>Placed on: <span>{new Date(order.created_at).toLocaleString()} </span> </h5>
          </div>
          <div className="total-price" title="Totla Price">
            <h4>${order.net_amount.toFixed(2)}}</h4>
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
              <h1>My Service Requests</h1>
              <button onClick={this.redirectPage} type="button" name="button">Add New Services</button>
              <a className="sr-cart" href={"/quote/?id=" + this.state.cart}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-bag" className="svg-inline--fa fa-shopping-bag fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path></svg>
              </a>
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

export default MyServiceRequest
