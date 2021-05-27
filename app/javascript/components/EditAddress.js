import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

class EditAddress extends React.Component {
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

  getSchema(){
    return yup.object().shape({
      address_line_one: yup.string().required('Address Line 1 is Required'),
      address_line_two: yup.string().required('Address Line 2 is Required'),
      city: yup.string().required('City is Required'),
      state: yup.string().required('State is Required'),
      country: yup.string().required('Country is Required'),
      pincode: yup.number('Enter number value').required('Pincode is Required')
    });
  }

  handleChange = (values) => {
    this.setState({ [event.target.name]: event.target.value })
    this.setState({ address_line_one: values.address_line_one })
    this.setState({ address_line_two: values.address_line_two })
    this.setState({ city: values.city })
    this.setState({ state: values.state })
    this.setState({ country: values.country })
    this.setState({ pincode: values.pincode })
    // this.props.onEditChange(event.target.name, event.target.value)
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleSubmit(event) {
    const userInputs = {
      address_line_one: this.state.address_line_one || this.props.properties.address_line_one,
      address_line_two: this.state.address_line_two || this.props.properties.address_line_two,
      city: this.state.city || this.props.properties.city,
      state: this.state.state || this.props.properties.state,
      country: this.state.country || this.props.properties.country,
      pincode: this.state.pincode || this.props.properties.pincode
    }
    axios
      .put("/addresses/" + this.props.properties.id + ".json", userInputs)
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
    this.props.setPopupProps('showEditForm', 'close')
    this.props.setPopupProps('properties', {})
  }

  render () {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            address_line_one: this.props.properties.address_line_one,
            address_line_two: this.props.properties.address_line_two,
            state: this.props.properties.state,
            city: this.props.properties.city,
            country: this.props.properties.country,
            pincode: this.props.properties.pincode
          }}
          onSubmit={(values, formikBag) => {
            this.handleChange(values)
            this.handleSubmit();
            formikBag.resetForm();
          }}
          validationSchema={this.getSchema()}
          enableReinitialize
        >
        {({errors, touched, values}) => (
          <main className={this.props.showEditForm + " popup-main"}>
            <div className="popup-div">
              <a onClick={this.popupClose} className="close-btn"> <span></span> </a>
              <div className="repair-form">
                <Form>
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <Field name="address_line_one" placeholder="Address Line One"/>
                    <ErrorMessage name="address_line_one" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <Field name="address_line_two" placeholder="Address Line Two"/>
                    <ErrorMessage name="address_line_two" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <Field name="pincode" placeholder="Pincode"/>
                    <ErrorMessage name="pincode" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <Field name="city" placeholder="City"/>
                    <ErrorMessage name="city" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <Field name="state" placeholder="State"/>
                    <ErrorMessage name="state" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <Field name="country" placeholder="Country"/>
                    <ErrorMessage name="country" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <button type="submit" className="" style={{backgroundColor: "rgb(230, 35, 70)"}}>Update</button>
                </Form>
              </div>
            </div>
          </main>
        )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default EditAddress
