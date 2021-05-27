import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

class NewAddress extends React.Component {
  state = {
    options: [],
    userInput: '',
    addressLineOne: '',
    addressLineTwo: '',
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
      addressLineOne: yup.string().required('Address Line 1 is Required'),
      addressLineTwo: yup.string().required('Address Line 2 is Required'),
      city: yup.string().required('City is Required'),
      state: yup.string().required('State is Required'),
      country: yup.string().required('Country is Required'),
      pincode: yup.number('Enter number value').required('Pincode is Required')
    });
  }

  handleChange = (values) => {
    this.setState({ addressLineOne: values.addressLineOne })
    this.setState({ addressLineTwo: values.addressLineTwo })
    this.setState({ city: values.city })
    this.setState({ state: values.state })
    this.setState({ country: values.country })
    this.setState({ pincode: values.pincode })
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleSubmit(values) {
    const userInputs = {
      address_line_one: values.addressLineOne,
      address_line_two: values.addressLineTwo,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pincode
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
    this.setState({addressLineOne: ''})
    this.setState({addressLineTwo: ''})
    this.setState({state: ''})
    this.setState({city: ''})
    this.setState({country: ''})
    this.setState({pincode: ''})
  }

  render () {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            addressLineOne: "",
            addressLineTwo: "",
            state: "",
            city: "",
            country: "",
            pincode: ""
          }}
          onSubmit={(values, formikBag) => {
            this.handleSubmit(values);
            formikBag.resetForm();
          }}
          validationSchema={this.getSchema()}
        >
        {({errors, touched, values}) => (
          <main className={this.props.show + " popup-main"}>
            <div className="popup-div">
              <a onClick={this.popupClose} className="close-btn"> <span></span> </a>
              <div className="repair-form">
                <Form>
                  <div className="form-group">
                    <label className="form-label">Address Line 1</label>
                    <Field name="addressLineOne" placeholder="Address Line One"/>
                    <ErrorMessage name="addressLineOne" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address Line 2</label>
                    <Field name="addressLineTwo" placeholder="Address Line Two"/>
                    <ErrorMessage name="addressLineTwo" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pincode</label>
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
                  <button type="submit" className="" style={{backgroundColor: "rgb(230, 35, 70)"}}>Add</button>
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

export default NewAddress
