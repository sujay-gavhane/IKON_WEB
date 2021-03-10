import PropTypes from "prop-types"
import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
function cardNumber(value) {
   value.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
 }
const CreditCard = props => {
  const [element, setElement] = useState();
  const [number, setNumber] = useState();
  const cvvInput = useRef();
  const handleTransition = (cardInner, numberItem) => {
    setElement(cardInner);
    setNumber(numberItem);
  };
  const getSchema = () =>
    yup.object().shape({
      cardNumber: yup.number('Enter number value').required('Card Number Required')
        .test('len', 'Card Number needs to be excatly 16 digits', val => val && val.toString().length === 16)
        .positive('Card Number must be positive number'),
      cardHolder: yup.string().required('Card Holder Name is Required'),
      cardMonth: yup.number('Enter number value').required('Card Expiry Month is Required')
        .positive('Card Expiry month must be positive number'),
      cardYear: yup.number('Enter number value').required('Card Expiry Year is Required')
        .positive('Card Expiry year must be positive number'),
      cvv: yup.number('Enter number value').required('CVV Number is Required')
        .positive('Card CVV number must be positive number')
    });
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            cardNumber: "",
            cardHolder: "",
            cardMonth: "",
            cardYear: "",
            cvv: ""
          }}
          onSubmit={(values, formikBag) => {
            alert(JSON.stringify(values, null, 2));
            props.placeOrder();
            formikBag.resetForm();
          }}
          validationSchema={getSchema()}
        >
          {({errors, touched, values}) => (
            <Form>
              {" "}

              <div className="form">
                <Field name="cardNumber" placeholder="Card Number" value={values.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()} />
                {errors.cardNumber && touched.cardNumber ? (
                   <div className="color-red">{errors.cardNumber}</div>
                 ) : null}
                <Field name="cardHolder" placeholder="Card Holder Name"/>
                {errors.cardHolder && touched.cardHolder ? (
                   <div className="color-red">{errors.cardHolder}</div>
                 ) : null}
                <div className="row card-date">
                  <div className="column">
                    <div>
                      <Field name="cardMonth" as="select" >
                        <option value="" disabled>
                          Month
                        </option>
                        {Array(12 - new Date().getMonth()).fill().map((element, index) => index + new Date().getMonth() + 1).map((m, i) => (
                          <option key={i} value={m}>{m < 10 ? `0${m}` : m}</option>
                        ))}
                      </Field>
                      <Field name="cardYear" as="select" >
                        <option value="" disabled>
                          Year
                        </option>
                        {Array(20).fill().map((element, index) => new Date().getFullYear() + index).map((y, i) => (
                          <option key={i} value={y}>{y}</option>
                        ))}
                      </Field>
                      {errors.cardMonth && touched.cardMonth ? (
                         <div className="color-red">{errors.cardMonth}</div>
                       ) : null}
                      {errors.cardYear && touched.cardYear ? (
                        <div className="color-red">{errors.cardYear}</div>
                      ) : null}
                    </div>
                  </div>{" "}
                  <div className="column">
                    <Field name="cvv" placeholder="CVV"/>
                    {errors.cvv && touched.cvv ? (
                       <div className="color-red">{errors.cvv}</div>
                     ) : null}
                  </div>
                </div>
                <button className="pay-btn checkout-btn" type="submit">
                  Pay
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
}
export default CreditCard
