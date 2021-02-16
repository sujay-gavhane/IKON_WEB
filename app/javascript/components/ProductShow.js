import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import Product1 from 'images/product1.jpg'
import Product2 from 'images/product2.jpg'
import Product3 from 'images/product3.jpg'

class ProductShow extends React.Component {
  state = {
    product: {},
    color: '',
    colors: [],
    msg: ''
  };

  constructor(props) {
    super(props);

    this.getProductDetails = this.getProductDetails.bind(this);
    this.showThisImg = this.showThisImg.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
    this.setCsrfToken();
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  getProductDetails = () => {
    var productID = document.getElementById('product-id').textContent
    axios
      .get("/products/" + productID + ".json")
        .then(res => {
            this.setState({ product: res.data.product })
            this.setState({ colors: res.data.product.colors })
            this.setState({ color: res.data.product.colors[0] })
          }
        )
       .catch(err => {
           console.log(err);
           return null;
       });
  };

  addToCart = () => {
    axios
      .post("/add_to_cart.json", { product: this.state.product, color: this.state.color })
        .then(res => {
            this.setState({ msg: res.data.msg })
          }
        )
       .catch(err => {
           console.log(err);
           return null;
       });
  };

  showThisImg(e){
    var img = e.target.src;
    var par = e.target.parentElement.parentElement.parentElement.querySelector(".one-img").style.background="url("+img+")";
  }

  handleColorChange(event) {
    this.setState({color: event.target.value});
  }

  render () {
    const colorOptions = this.state.colors.map((color) => 
      <option key={color} value={color}>{color}</option>
    )

    return (
      <React.Fragment>
        {this.state.msg != '' && <div className="alert alert-success">{this.state.msg}</div>}
        <section className="bottom-nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Our Collection</a></li>
            <li><a href="#">Product</a></li>
          </ul>
          <a className="b-nav-cart" href="#">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-bag" className="svg-inline--fa fa-shopping-bag fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path></svg>
          </a>
        </section>

        <main className="product-m">
          <div className="product-d">
            <div className="img-side">
              <div className="imgss">
                <div className="all-imgs">
                  <div className="img" onClick={this.showThisImg}>
                    <img src={Product1} alt="product"></img>
                  </div>
                  <div className="img" onClick={this.showThisImg}>
                    <img src={Product2} alt="product"></img>
                  </div>
                  <div className="img" onClick={this.showThisImg}>
                    <img src={Product3} alt="product"></img>
                  </div>
                </div>
                <div className="one-img">

                </div>
              </div>
            </div>
            <div className="info-side">
                <h1>{this.state.product.name}</h1>
                <h2>${this.state.product.price} + <span>Shipping</span></h2>
                <p>{this.state.product.description}</p>

                <h3>Color:</h3>   
                <select value={this.state.color} onChange={this.handleColorChange}>
                  {colorOptions}
                </select>
            </div>
          </div>
          <button type="button" name="button" onClick={this.addToCart}>Add to Cart</button>
        </main>
      </React.Fragment>
    );
  }
}

ProductShow.propTypes = {
};
export default ProductShow
