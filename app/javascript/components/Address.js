import React from "react"
import PropTypes from "prop-types"
import AddressesList from "./AddressesList"
import NewAddress from "./NewAddress"
import EditAddress from "./EditAddress"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
class Address extends React.Component {
  state = {
    show: '',
    properties: {},
    addresses: [],
    countries: {}
  };

  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.updateStates = this.updateStates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAddresses = this.getAddresses.bind(this);
  }

  componentDidMount() {
    this.getAddresses();
  }

  open(){
    this.updateStates('show', 'open')
  }

  updateStates(name, val){
    this.setState({ [name]: val })
  }

  getAddresses = () => {
    axios
      .get("/addresses.json?")
        .then(res => {
          this.setState({ addresses: res.data.addresses, countries: res.data.countries })
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  };

  handleChange = (name, value) => {
    var prop = this.state.properties
    prop[name] = value
    this.setState({ 'properties': prop })
  }

  render () {
    return (
      <React.Fragment>
        <main className="cart-m address-m">
        <div className="cart-d">
          <div className="cart-top">
            <h1>My Address</h1>
            <button onClick={this.open} type="button" name="button"><FontAwesomeIcon icon={faPlus} /></button>
            <NewAddress updateAddressList={this.getAddresses} setPopupProps={this.updateStates} show={this.state.show} />
            <EditAddress onEditChange={this.handleChange} updateAddressList={this.getAddresses} setPopupProps={this.updateStates} showEditForm={this.state.showEditForm} properties={this.state.properties} />
          </div>
          <AddressesList countries={this.state.countries} updateAddressList={this.getAddresses} setPopupProps={this.updateStates} addresses={this.state.addresses}/>
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
