import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { Modal } from 'react-bootstrap';

class NewAddress extends React.Component {
  state = {
    options: [],
    userInput: '',
    address_line_one: '',
    address_line_two: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  };

  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.popupClose = this.popupClose.bind(this);
    this.setProperties = this.setProperties.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
    this.setProperties();
  }

  setProperties() {
    this.setState({ address_line_one: this.props.properties.address_line_one })
    this.setState({ address_line_two: this.props.properties.address_line_two })
    this.setState({ city: this.props.properties.city })
    this.setState({ state: this.props.properties.state })
    this.setState({ country: this.props.properties.country })
    this.setState({ pincode: this.props.properties.pincode })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleSubmit(event) {
    const userInputs = {
      address_line_one: this.state.address_line_one,
      address_line_two: this.state.address_line_two,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      pincode: this.state.pincode
    }
    if(this.props.properties.id){
      axios
        .put("/addresses/" + this.props.properties.id + ".json", userInputs)
          .then(res => {
            this.setState({ msg: res.data.msg })
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    } else {
      axios
        .post("/addresses.json", userInputs)
          .then(res => {
            this.setState({ msg: res.data.msg })
          })
         .catch(err => {
             console.log(err);
             return null;
         });
    }
  }

  popupClose(){
    this.props.popupOpen('close')
  }

  render () {
    return (
      <React.Fragment>
        <main className={this.props.show + " popup-main"}>
          <div className="popup-div">
            <a onClick={this.popupClose} className="close-btn"> <span></span> </a>
            <div className="repair-form">
              <form onSubmit={this.handleSubmit} className="">
                <div className="form-group">
                  <label className="form-label">Address Line 1</label>
                  <input onChange={this.handleChange} name="address_line_one" placeholder="Address" required="" type="text" className="form-control" value={this.state.address_line_one || this.props.properties.address_line_one}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Address Line 2</label>
                  <input onChange={this.handleChange} name="address_line_two" placeholder="Address" required="" type="text" className="form-control" value={this.state.address_line_two  || this.props.properties.address_line_two}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input onChange={this.handleChange} name="pincode" placeholder="Postal Code" required="" type="text" className="form-control" value={this.state.pincode || this.props.properties.pincode}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input onChange={this.handleChange} name="city" placeholder="City" required="" type="text" className="form-control" value={this.state.city || this.props.properties.city}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input onChange={this.handleChange} name="state" placeholder="State" required="" type="text" className="form-control" value={this.state.state || this.props.properties.state}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input onChange={this.handleChange} name="country" placeholder="Country" required="" type="text" className="form-control" value={this.state.country || this.props.properties.country}></input>
                </div>
                <button type="submit" className="" style={{backgroundColor: "rgb(230, 35, 70)"}}>Add</button>
              </form>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default NewAddress
