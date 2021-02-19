import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { Modal } from 'react-bootstrap';
class NewAddress extends React.Component {
  state = {
    show: false,
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
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
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

  render () {
    return (
      <React.Fragment>
        <button style={{float: "right"}} className="btn btn-primary" variant="primary" onClick={this.handleShow}>
          Add New Address
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="address-inputs">
                <input onChange={this.handleChange}
                  type="text"
                  name="address_line_one"
                  value={this.state.address_line_one}
                  placeholder="Address Line One"
                />
                <input onChange={this.handleChange}
                  type="text"
                  name="address_line_two"
                  value={this.state.address_line_two}
                  placeholder="Address Line Two"
                />
                <input onChange={this.handleChange}
                  type="text"
                  name="city"
                  value={this.state.city}
                  placeholder="City"
                />
                <input onChange={this.handleChange}
                  type="text"
                  name="state"
                  value={this.state.state}
                  placeholder="State"
                />
                <input onChange={this.handleChange}
                  type="text"
                  name="country"
                  value={this.state.country}
                  placeholder="Country"
                />
                <input onChange={this.handleChange}
                  type="text"
                  name="pincode"
                  value={this.state.pincode}
                  placeholder="Pincode"
                />
              </div>
              <div className="address-buttons">
                <button className="btn btn-primary" variant="secondary" onClick={this.handleClose}>
                  Close
                </button>
                <button className="btn btn-primary" variant="primary" onClick={this.handleClose}>
                  Save Changes
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default NewAddress
