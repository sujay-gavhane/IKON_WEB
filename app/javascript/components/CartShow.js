import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import Product2 from 'images/product2.jpg'

class CartShow extends React.Component {
  state = {
    cart_items: []
  }
  constructor(props) {
    super(props);

    this.getCartItems = this.getCartItems.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    var cartID = document.getElementById('cart-id').textContent
    axios
      .get("/carts/" + cartID + ".json")
        .then(res => {
          console.log(res)
          this.setState({ cart_items: res.data.cart_items })
        }
      )
      .catch(err => {
         console.log(err);
         return null;
       });
  };

  render () {
    const cartItems = this.state.cart_items.map((item) =>
      <article key={item.id}>
        <a href={"/products/" + item.product_id}>
          <div>
            <div className="img">
              <img src={Product2} alt="product"></img>
            </div>
            <div className="info">
              <div className="">
                <h1>{item.product.name}</h1>
                <p>${item.product.price}</p>
                <p>{item.color.name}</p>
              </div>
            </div>
          </div>
        </a>
      </article>  
    );
    return (
      <React.Fragment>
        <main className="shop-m" id="shop-m">
          <div className="shop-d">
            <div className="cart-items" id="our-collection-div">
              {cartItems}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default CartShow
