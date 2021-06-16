import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import SelectAddress from "./SelectAddress"
import axios from 'axios';
class ServiceRequestAmount extends React.Component {
  state = {
    toggleAddressPopup: ''
  }

  constructor(props) {
    super(props);

    this.closeAddressPopup = this.closeAddressPopup.bind(this);
    this.openAddressPopup = this.openAddressPopup.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  openAddressPopup(){
    this.setState({toggleAddressPopup: 'open'})
  }
  
  closeAddressPopup() {
    this.setState({toggleAddressPopup: ''})
  }

  updateAddress(addressId){
    var orderID = document.getElementById('order-id').textContent
    axios
      .put("/service_requests/" + orderID + "/update_address.json", {address_id: addressId})
        .then(res => {
          this.props.updateAddress('address', res.data.address)
          this.closeAddressPopup()
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  render () {
    return (
      <React.Fragment>
        <div className="checkout-side">
          <div className="">
            <h1>Total Amount:</h1>
            <h2>${this.props.order.total_amount}</h2>
            <h1>Discount:</h1>
            <h2>${this.props.discount}</h2>
            <h1>Tax:</h1>
            <h2>${this.props.tax}</h2>
            <h1>Grand Total:</h1>
            <h2>${this.props.order.net_amount}</h2>
            <h1>Estimated Time:</h1>
            <h2>{this.props.order.total_estimated_time && this.props.order.total_estimated_time + " Minutes"}</h2>
            <h1>Status:</h1>
            <h2>{this.props.status}</h2>
            <hr></hr>
            <div className="my-address">
              <div className="address-item">
                <a onClick={this.openAddressPopup}><FontAwesomeIcon icon={faPencilAlt} /></a>
                <h6>Address </h6>
                <h1>{this.props.address.address_line_one}, {this.props.address.address_line_two}</h1>
                <h3> <span>{this.props.address.pincode},</span> {this.props.address.city}, {this.props.address.state}</h3>
                <h4>{this.props.address.country}</h4>
              </div>
            </div>
          </div>
        </div>
        <SelectAddress selectedAddress={this.updateAddress} closePopup={this.closeAddressPopup} toggleAddressPopup={this.state.toggleAddressPopup}/>
      </React.Fragment>
    );
  }
}
ServiceRequestAmount.defaultProps = {
  tax: 0
}

export default ServiceRequestAmount
