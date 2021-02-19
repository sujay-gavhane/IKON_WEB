import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import NewAddress from "./NewAddress"

class AddressesList extends React.Component {
  state = {
    addresses: []
  };

  constructor(props) {
    super(props);

    this.getAddresses = this.getAddresses.bind(this);
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
  render () {
    const addresses = this.state.addresses.map((address) =>
      <article key={address.id} className="">
        <div>
          <div className="info">
            <div>
              <p>{address.address_line_one}</p>
              <p>{address.address_line_two}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.country}</p>
              <p>{address.pincode}</p>
            </div>
          </div>
        </div>
      </article>
    );
    return (
      <React.Fragment>
        <NewAddress />
        <main className="shop-m" >
          <div>
            <div id="our-collection-div">
              {addresses}
            </div>    
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default AddressesList
