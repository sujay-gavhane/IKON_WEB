import React from "react"
import PropTypes from "prop-types"
import AddressesList from "./AddressesList"
import NewAddress from "./NewAddress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class Address extends React.Component {
  state = {
    show: '',
    properties: []
  };

  constructor(props) {
    super(props);

    this.popupOpen = this.popupOpen.bind(this);
    this.open = this.open.bind(this);
    this.setPopupProps = this.setPopupProps.bind(this);
  }

  popupOpen(val){
    this.setState({ show: val })
  }

  open(){
    this.setState({ show: 'open' })
    this.setState({ properties: {} })
  }

  setPopupProps(val, properties){
    this.setState({ show: val })
    this.setState({ properties: properties })
  }

  render () {
    return (
      <React.Fragment>
        <main className="cart-m address-m">
        <div className="cart-d">
          <div className="cart-top">
            <h1>My Address</h1>
            <button onClick={this.open} type="button" name="button"><FontAwesomeIcon icon={faPlus} /></button>
            <NewAddress popupOpen={this.popupOpen} show={this.state.show} properties={this.state.properties} />
          </div>
          <AddressesList setPopupProps={this.setPopupProps}/>
        </div>
      </main>
      </React.Fragment>
    );
  }
}

Address.propTypes = {
  products: PropTypes.string
};
export default Address
