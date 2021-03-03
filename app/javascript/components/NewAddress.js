import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';

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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.popupClose = this.popupClose.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
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
          this.setState({ msg: res.data.msg, errors: res.data.errors })
          if(res.data.msg != ''){
            this.props.updateAddressList()
            this.popupClose()
          }
        })
       .catch(err => {
           console.log(err);
           return null;
       });
  }

  popupClose(){
    this.props.setPopupProps('show', 'close')
    this.props.setPopupProps('properties', {})
    this.setState({address_line_one: ''})
    this.setState({address_line_two: ''})
    this.setState({state: ''})
    this.setState({city: ''})
    this.setState({country: ''})
    this.setState({pincode: ''})
  }

  render () {
    return (
      <React.Fragment>
        <main className={this.props.show + " popup-main"}>
          <div className="popup-div">
            <a onClick={this.popupClose} className="close-btn"> <span></span> </a>
            <div className="repair-form">
              <form>
                <div className="form-group">
                  <label className="form-label">Address Line 1</label>
                  <input onChange={this.handleChange} name="address_line_one" placeholder="Address" required="" type="text" className="form-control" value={this.state.address_line_one}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Address Line 2</label>
                  <input onChange={this.handleChange} name="address_line_two" placeholder="Address" required="" type="text" className="form-control" value={this.state.address_line_two}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input onChange={this.handleChange} name="pincode" placeholder="Postal Code" required="" type="text" className="form-control" value={this.state.pincode}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input onChange={this.handleChange} name="city" placeholder="City" required="" type="text" className="form-control" value={this.state.city}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input onChange={this.handleChange} name="state" placeholder="State" required="" type="text" className="form-control" value={this.state.state}></input>
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input onChange={this.handleChange} name="country" placeholder="Country" required="" type="text" className="form-control" value={this.state.country}></input>
                </div>
                <button onClick={this.handleSubmit} type="button" className="" style={{backgroundColor: "rgb(230, 35, 70)"}}>Add</button>
              </form>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default NewAddress
