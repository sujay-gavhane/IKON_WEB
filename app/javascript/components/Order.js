import React from "react"
import PropTypes from "prop-types"
import OrderSummary from "./OrderSummary"
class Order extends React.Component {
  render () {
    return (
      <React.Fragment>
        <OrderSummary />
      </React.Fragment>
    );
  }
}

export default Order
