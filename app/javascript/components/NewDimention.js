import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

class NewDimention extends React.Component {
  state = {
    options: [],
    userInput: '',
    name: '',
    width: '',
    weight: '',
    height: '',
    length: ''
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCsrfToken = this.setCsrfToken.bind(this);
    this.popupClose = this.popupClose.bind(this);
  }

  componentDidMount() {
    this.setCsrfToken();
  }

  getSchema(){
    return yup.object().shape({
      name: yup.string().required('Product Name is Required'),
      weight: yup.number('Enter number value').required('Weight is Required'),
      height: yup.number('Enter number value').required('Height is Required'),
      width: yup.number('Enter number value').required('Width is Required'),
      length: yup.number('Enter number value').required('Length is Required')
    });
  }

  setCsrfToken() {
    const csrfToken = document.querySelector("meta[name=csrf-token]").content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }

  handleSubmit(values) {
    const userInputs = {
      name: values.name,
      weight: values.weight,
      height: values.height,
      width: values.width,
      length: values.length
    }
    axios
      .post("/product_dimentions.json", userInputs)
        .then(res => {
          this.setState({ msg: res.data.msg, errors: res.data.errors })
          if(res.data.msg != ''){
            this.props.updateDimentionList()
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
    this.setState({name: ''})
    this.setState({weight: ''})
    this.setState({height: ''})
    this.setState({length: ''})
    this.setState({width: ''})
  }

  render () {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            name: "",
            weight: "",
            height: "",
            length: "",
            width: ""
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
                    <label className="form-label">Product Name</label>
                    <Field name="name" placeholder="Enter Name"/>
                    <ErrorMessage name="name" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Weight (in lb)</label>
                    <Field name="weight" placeholder="Enter Weight"/>
                    <ErrorMessage name="weight" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Height (in Inches)</label>
                    <Field name="height" placeholder="Enter Height"/>
                    <ErrorMessage name="height" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Width (in Inches)</label>
                    <Field name="width" placeholder="Enter Widht"/>
                    <ErrorMessage name="width" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Product Length (in Inches)</label>
                    <Field name="length" placeholder="Enter Length"/>
                    <ErrorMessage name="length" render={msg => <div className="color-red">{msg}</div>}/>
                  </div>
                  <button type="submit" style={{backgroundColor: "rgb(230, 35, 70)"}}>Add</button>
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

export default NewDimention
