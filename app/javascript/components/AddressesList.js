import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import NewAddress from "./NewAddress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class AddressesList extends React.Component {
  constructor(props) {
    super(props);

    this.destroy = this.destroy.bind(this);
    this.open = this.open.bind(this);
  }

  open(){
    var addresses = this.props.addresses
    for (var index = 0; index < addresses.length; index++) { 
      if (addresses[index].id == parseInt(event.target.parentElement.className)){
        const currentAddress = addresses[index]
        this.props.setPopupProps('showEditForm', 'open')
        this.props.setPopupProps('properties', currentAddress)
      }
    }
  }

  destroy(){
    var confirmDelete = confirm("Are you sure you want to delete?");
    var addrId = event.target.closest("a").className;
    if (confirmDelete) {
      axios
        .delete("/addresses/" + addrId + ".json")
          .then(res => {
            this.setState({ msg: res.data.msg })
            this.props.updateAddressList()
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  render () {
    const addresses = this.props.addresses.map((address, i) =>
      <div key={address.id + 1} className="address-item">
        <h6>Address {i + 1}</h6>
        <a onClick={this.destroy} className={address.id}><FontAwesomeIcon icon={faTrashAlt} /></a>
        <a onClick={this.open} className={address.id}><FontAwesomeIcon icon={faPencilAlt} /></a>
        <h1>{address.address_line_one}, {address.address_line_two}</h1>
        <h3> <span>{address.pincode},</span> {address.city}, {address.state}</h3>
        <h4>{address.country}</h4>
      </div>
    );
    return (
      <React.Fragment>
        <div className="my-address">
          {addresses}
        </div>
      </React.Fragment>
    );
  }
}

export default AddressesList
