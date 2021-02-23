import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import NewAddress from "./NewAddress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class AddressesList extends React.Component {
  state = {
    addresses: []
  };

  constructor(props) {
    super(props);

    this.getAddresses = this.getAddresses.bind(this);
    this.destroy = this.destroy.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    this.getAddresses();
  }

  getAddresses = () => {
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

  open(){
    for (var index = 0; index < this.state.addresses.length; index++) { 
      if (this.state.addresses[index].id == parseInt(event.target.parentElement.className)){
        const currentAddress = this.state.addresses[index]
        this.props.setPopupProps('open', currentAddress)
      }
    }
  }

  destroy(){
    var confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios
        .delete("/addresses/" + event.target.parentElement.parentElement.className + ".json")
          .then(res => {
            this.setState({ msg: res.data.msg })
            this.getAddresses();
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  render () {
    const addresses = this.state.addresses.map((address, i) =>
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
