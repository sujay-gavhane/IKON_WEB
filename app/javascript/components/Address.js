import React from "react"
import PropTypes from "prop-types"
import AddressesList from "./AddressesList"
class Address extends React.Component {
  render () {
    return (
      <React.Fragment>
      	<AddressesList />
      </React.Fragment>
    );
  }
}

Address.propTypes = {
  products: PropTypes.string
};
export default Address
