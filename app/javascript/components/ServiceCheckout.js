import React from "react"
import PropTypes from "prop-types"
import ServiceCartItems from "./ServiceCartItems"
import SelectAddress from "./SelectAddress"
import ServiceCartAmount from "./ServiceCartAmount"
import CreditCard from "./CreditCard"
import ProductDimentions from "./ProductDimentions"
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
    checkout: false,
    toggleAddressPopup: '',
    toggleDimentionsPopup: '',
    selectedAddress: {},
    selectedDimention: {},
    couponId: 0,
    cardNumber: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cvv: '',
    tax: 0,
    amountSet: false
  }

  constructor(props) {
    super(props);

    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.openAddressPopup = this.openAddressPopup.bind(this);
    this.closeAddressPopup = this.closeAddressPopup.bind(this);
    this.selectedAddress = this.selectedAddress.bind(this);
    this.selectedDimention = this.selectedDimention.bind(this);
    this.updateState = this.updateState.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateChange = this.updateChange.bind(this);
    this.openDimentionsPopup = this.openDimentionsPopup.bind(this);
    this.closeDimentionsPopup = this.closeDimentionsPopup.bind(this);
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
      value = value > 0 ? value : 0
    }
    this.setState({[name]: value})
  }

  openAddressPopup(){
    this.setState({toggleAddressPopup: 'open'})
  }

  closeAddressPopup() {
    this.setState({toggleAddressPopup: ''})
  }

  openDimentionsPopup(){
    this.setState({toggleDimentionsPopup: 'open'})
  }

  closeDimentionsPopup() {
    this.setState({toggleDimentionsPopup: ''})
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

  selectedDimention(dimentionId){
    event.stopPropagation();
    axios
      .get("/product_dimentions/ " + dimentionId + ".json?")
        .then(res => {
          this.setState({ selectedDimention: res.data.dimention })
          this.closeDimentionsPopup()
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
      product_dimention_id: this.state.selectedDimention.id,
      total_amount: this.state.totalEstimatedCostLabor + this.state.totalEstimatedCostPart,
      total_estimated_time: this.state.totalEstimatedTime,
      net_amount: this.state.netPayable,
      taxes: this.state.tax
      },
      card_number: this.state.cardNumber,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      card_month: this.state.cardMonth,
      card_year: this.state.cardYear,
      cvv: this.state.cvv
    }
    if (this.state.selectedAddress.id && this.state.selectedDimention.id) {
      axios
        .post("/service_requests.json", service_request_params)
          .then(res => {
            location.href = res.data.url
          })
         .catch(err => {
             console.log(err);
             return null;
         });
     } else if (this.state.selectedAddress.id == undefined){
      alert('Please Select Delivery Address')
     } else if (this.state.selectedDimention.id == undefined){
      alert('Please Select Product Dimensions to be repaired.')
     }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateChange(values) {
    this.setState({ cardNumber: values.cardNumber })
    this.setState({ firstName: values.cardHolder.split(' ')[0] || ''})
    this.setState({ lastName: values.cardHolder.split(' ')[1] || ''})
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
                <ServiceCartItems updateState={this.updateState} checkout={this.state.amountSet}/>
              </div>
              <hr></hr>
              <div className="checkout-side">
                { this.state.amountSet &&
                  <ServiceCartAmount
                    tax={this.state.tax}
                    updateState={this.updateState}
                    totalEstimatedCostLabor={this.state.totalEstimatedCostLabor}
                    totalEstimatedCostPart={this.state.totalEstimatedCostPart}
                    totalEstimatedTime={this.state.totalEstimatedTime}
                    netPayable={this.state.netPayable} checkout={this.state.amountSet}
                    totalAmount={this.state.totalAmount}/>
                }
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
                    { this.state.selectedDimention.id != undefined
                      ?
                      <div className="my-address">
                        <div className="address-item">
                          <a onClick={this.openDimentionsPopup}><FontAwesomeIcon icon={faPencilAlt} /></a>
                          <h6>Dimension </h6>
                          <h1>Name: {this.state.selectedDimention.name}</h1>
                          <h1>Weight: {this.state.selectedDimention.weight}</h1>
                          <h1>Width: {this.state.selectedDimention.width}</h1>
                          <h1>Length: {this.state.selectedDimention.length}</h1>
                          <h1>Height: {this.state.selectedDimention.height}</h1>
                        </div>
                      </div> 
                     :
                      <div className="my-address">
                        <div className="address-item">
                          <a onClick={this.openDimentionsPopup}><FontAwesomeIcon icon={faPlus} /></a>
                          <h6>Dimensions</h6>
                          <p style={{textAlign: 'center'}}>Enter Dimensions</p>
                        </div>
                      </div>
                    } 
                    <hr></hr>
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
        <ProductDimentions updateState={this.updateState} selectedDimention={this.selectedDimention} closePopup={this.closeDimentionsPopup} toggleAddressPopup={this.state.toggleDimentionsPopup}/>
      </React.Fragment>
    );
  }
}

export default ServiceCheckout
