import React from "react"
import PropTypes from "prop-types"
import ServiceCartItems from "./ServiceCartItems"
import SelectAddress from "./SelectAddress"
import ServiceCartAmount from "./ServiceCartAmount"
import CreditCard from "./CreditCard"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
class ServiceCheckout extends React.Component {
  state = {
    totalAmount: 0,
    couponMsg: '',
    netPayable: 0,
    discount: 0,
    checkout: true,
    toggleAddressPopup: '',
    selectedAddress: {},
    couponId: 0,
    cardNumber: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cvv: ''
  }

  constructor(props) {
    super(props);

    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.openAddressPopup = this.openAddressPopup.bind(this);
    this.closeAddressPopup = this.closeAddressPopup.bind(this);
    this.selectedAddress = this.selectedAddress.bind(this);
    this.updateState = this.updateState.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateChange = this.updateChange.bind(this);
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  redirectPage() {
    location.href = "/services/new"
  }

  updateState(value, name, discount) {
    if(name == 'netPayable' && this.state.discount > 0){
      value = value - this.state.discount
    }
    this.setState({[name]: value})
  }

  openAddressPopup(){
    this.setState({toggleAddressPopup: 'open'})
  }

  closeAddressPopup() {
    this.setState({toggleAddressPopup: ''})
  }

  selectedAddress(addressId){
    axios
      .get("/addresses/ " + addressId + ".json?")
        .then(res => {
          this.setState({ selectedAddress: res.data.address })
          this.closeAddressPopup()
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  placeOrder(){
    var service_request_params = { service_request: {
      coupon_id: this.state.couponId,
      address_id: this.state.selectedAddress.id,
      total_amount: this.state.totalEstimatedCostLabor + this.state.totalEstimatedCostPart,
      total_estimated_time: this.state.totalEstimatedTime,
      net_amount: this.state.netPayable,
      taxes: 20
      },
      card_number: this.state.cardNumber,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      card_month: this.state.cardMonth,
      card_year: this.state.cardYear,
      cvv: this.state.cvv
    }
    if (this.state.selectedAddress.id) {
      axios
        .post("/service_requests.json", service_request_params)
          .then(res => {
            location.href = res.data.url
          })
         .catch(err => {
             console.log(err);
             return null;
         });
     } else {
      alert('Please Select Delivery Address')
     }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateChange(values) {
    this.setState({ cardNumber: values.cardNumber })
    this.setState({ firstName: values.cardHolder.split(' ')[0] })
    this.setState({ lastName: values.cardHolder.split(' ')[1] })
    this.setState({ cardMonth: values.cardMonth })
    this.setState({ cardYear: values.cardYear })
  }

  render () {
    return (
      <React.Fragment>
        <main className="cart-m order-summary">
          <div className="cart-d">
            <div className="cart-top">
              <h1>Shoping Cart</h1>
              <button onClick={this.redirectPage} type="button" name="button">Add New Services</button>
            </div>
            <div className="main-cart">
              <div className="item-side">
                <ServiceCartItems updateState={this.updateState} checkout={this.state.checkout}/>
              </div>
              <hr></hr>
              <div className="checkout-side">
                <ServiceCartAmount
                  updateState={this.updateState}
                  totalEstimatedCostLabor={this.state.totalEstimatedCostLabor}
                  totalEstimatedCostPart={this.state.totalEstimatedCostPart}
                  totalEstimatedTime={this.state.totalEstimatedTime}
                  netPayable={this.state.netPayable} checkout={this.state.checkout}/>
              </div>
            </div>
            <hr></hr>
              <div className="main-cart">
                <div className="item-side">
                  <div className="card-details">
                    <CreditCard updateChange={this.updateChange} placeOrder={this.placeOrder}/>
                  </div>
                </div>
                <hr></hr>
                <div className="checkout-side">
                  <div className="">
                    { this.state.selectedAddress.id != undefined
                    ?
                    <div className="my-address">
                      <div className="address-item">
                        <a onClick={this.openAddressPopup}><FontAwesomeIcon icon={faPencilAlt} /></a>
                        <h6>Address </h6>
                        <h1>{this.state.selectedAddress.address_line_one}, {this.state.selectedAddress.address_line_two}</h1>
                        <h3> <span>{this.state.selectedAddress.pincode}</span> {this.state.selectedAddress.city}, {this.state.selectedAddress.state}</h3>
                        <h4>{this.state.selectedAddress.country}</h4>
                      </div>
                    </div>
                    :
                    <div className="my-address">
                      <div className="address-item">
                        <a onClick={this.openAddressPopup}><FontAwesomeIcon icon={faPlus} /></a>
                        <h6>Address </h6>
                        <p style={{textAlign: 'center'}}>Select Address</p>
                      </div>
                    </div>
                    }
                  </div>
                </div>
              </div>
          </div>
        </main>
        <SelectAddress selectedAddress={this.selectedAddress} closePopup={this.closeAddressPopup} toggleAddressPopup={this.state.toggleAddressPopup}/>
      </React.Fragment>
    );
  }
}

export default ServiceCheckout
