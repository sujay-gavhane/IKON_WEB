import React from "react"
import PropTypes from "prop-types"
import Product2 from 'images/product2.jpg'
import Product3 from 'images/product3.jpg'
class Products extends React.Component {
  render () {
    const collections = this.props.collections.map((product) =>
      <article key={product.name}>
        <div>
          <div className="img">
            <img src={Product2} alt="product"></img>
          </div>
          <div className="info">
            <div className="">
              <h1>{product.name}</h1>
              <h1>{product.category_name}</h1>
              <p>${product.price}</p>
            </div>
          </div>
        </div>
      </article>
    );

    const parts = this.props.parts.map((part) =>
      <article key={part.name}>
        <div>
          <div className="img">
            <img src={Product3} alt="product"></img>
          </div>
          <div className="info">
            <div className="">
              <h1>{part.name}</h1>
              <h1>{part.category_name}</h1>
              <p>${part.price}</p>

            </div>
          </div>
        </div>
      </article>
    );

    return (
      <React.Fragment>
        <main className="shop-m" id="shop-m">
          <div className="shop-d">
            <div className="btns">
              <button type="button" className="active switch-shop-page" data-collection="collection" name="button">Our Collection</button>
              <button type="button" name="button" className="switch-shop-page" data-collection="parts">Parts</button>
            </div>
            <button type="button" className="items-dd-btns switch-shop-page" name="button" data-collection="collection-mob">
              Our Collection
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
            </button>

            <div className="items" id="our-collection-div">
              {collections}
            </div>

            <button type="button" className="items-dd-btns switch-shop-page" name="button" data-collection="parts-mob">
              Parts
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" className="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
            </button>
            <div className="items" id="parts-div">
              {parts}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  collections: PropTypes.array,
  parts: PropTypes.array
};
export default Products



