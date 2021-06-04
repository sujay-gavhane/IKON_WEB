import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import NewAddress from "./NewAddress"

class SelectAddress extends React.Component {
  state = {
    addresses: []
  }
  constructor(props) {
    super(props);

    this.getAddressItems = this.getAddressItems.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.updateStates = this.updateStates.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    this.getAddressItems();
  }

  open(){
    this.updateStates('show', 'open')
  }

  getAddressItems = () => {
    axios
      .get("/addresses.json?")
        .then(res => {
          this.setState({ addresses: res.data.addresses })
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  };

  updateStates(name, val){
    this.setState({ [name]: val })
  }

  setAddress() {
    this.props.selectedAddress(event.target.closest("a").dataset.address)
  }

  render () {
    const addresses = this.state.addresses.map((address, i) =>
      <a key={address.id} onClick={this.setAddress} data-address={address.id}>
        <div className="address-item">
          <h6>Address {i + 1}</h6>
          <h1>{address.address_line_one}, {address.address_line_two}</h1>
          <h3> <span>{address.pincode}</span> {address.city}, {address.state}</h3>
          <h4>{address.country}</h4>
        </div>
      </a>
    );
    return (
      <React.Fragment>
        <main className={"popup-main choose-address " + this.props.toggleAddressPopup}>
          <div className="popup-div">
            <div className='select-address'>
              <h2 style={{display: 'inline'}}>Select Address</h2>
              <button onClick={this.open} type="button" name="button"><FontAwesomeIcon icon={faPlus} /></button>
              <a onClick={this.props.closePopup} className="close-btn"> <span></span> </a>
            </div>
            <NewAddress updateAddressList={this.getAddressItems} setPopupProps={this.updateStates} show={this.state.show} />
            <div className="my-address" style={{maxHeight: '500px', overflowY: 'scroll'}}>
              {addresses}
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default SelectAddress
