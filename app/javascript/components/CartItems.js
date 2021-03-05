import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import Product2 from 'images/product2.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class CartItems extends React.Component {
  state = {
    cart_items: []
  }
  constructor(props) {
    super(props);

    this.getCartItems = this.getCartItems.bind(this);
    this.destroy = this.destroy.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    var cartID = document.getElementById('cart-id').textContent
    var totalAmount = 0
    axios
      .get("/carts/" + cartID + ".json")
        .then(res => {
          this.setState({ cart_items: res.data.cart_items })
          this.state.cart_items.map((item) => 
            totalAmount = totalAmount + (item.product.price * item.quantity)
          );
          this.props.updateTotalAmmount(totalAmount, 'totalAmount', 0)
          this.props.updateTotalAmmount(res.data.cart_items.length, 'cartItemsCount', 0)
          this.props.updateTotalAmmount(totalAmount, 'netPayable', 0)
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
        .delete("/carts/" + cartItemId + ".json")
          .then(res => {
            this.getCartItems();
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  updateQuantity() {
    var cart_items = this.state.cart_items
    cart_items.map((item) => {
      if (item.id == parseInt(event.target.closest("a").dataset.id)){
        return item.quantity = item.quantity + parseInt(event.target.closest("a").dataset.quantity)
      }
    })
    this.setState({cart_items: cart_items})
    var cartID = document.getElementById('cart-id').textContent
    var params = { 
      product_id: event.target.closest("div").dataset.productId,
      color_id: event.target.closest("div").dataset.colorId,
      quantity: event.target.closest("a").dataset.quantity
    }
    axios
      .put("/carts/" + cartID + "/update_quantity.json?", params)
        .then(res => {
          this.setState({ msg: res.data.msg })
          this.getCartItems();
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  }

  render () {
    const cartItems = this.state.cart_items.map((item) =>
      <div key={item.id} className="cart-item">
        { !this.props.checkout &&
          <div className="remove">
            <a className={item.id} onClick={this.destroy}><FontAwesomeIcon icon={faTimes} /></a>
          </div>
        }
            
        <div className="img">
          <img src={Product2} alt="product"></img>
        </div>
        <div className="titles">
          <h2>{item.product.name}</h2>
          <h3>{item.category_name}</h3>
          <span>{item.color.name}</span>
        </div>
        { this.props.checkout
          ? <React.Fragment><div className="quantity">
              <h5>Quantity: {item.quantity}</h5>
            </div>
            <div className="total-price">
              <h4>${item.product.price * item.quantity}</h4>
            </div></React.Fragment>
          : <React.Fragment><div className="quantity" data-product-id={item.product.id} data-color-id={item.color.id}>
              <a data-quantity={-1} data-id={item.id} onClick={this.updateQuantity}><FontAwesomeIcon icon={faMinus} /></a>
              <input className="quantity-input" type="number" value={item.quantity} readOnly></input>
              <a data-quantity={1} data-id={item.id} onClick={this.updateQuantity}><FontAwesomeIcon icon={faPlus} /></a>
            </div>
            <div className="unit-price">
              <h4>${item.product.price}</h4>
            </div>
            <div className="total-price">
              <h4>${item.product.price * item.quantity}</h4>
            </div></React.Fragment>
        }
      </div>
    );
    return (
      <React.Fragment>
        {cartItems}
      </React.Fragment>
    );
  }
}

export default CartItems
